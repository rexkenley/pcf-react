import * as React from "react";
import * as ReactDOM from "react-dom";
import { initializeIcons } from "@uifabric/icons";
import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class DatetimeBox
  implements ComponentFramework.StandardControl<IInputs, IOutputs> {
  private container: HTMLDivElement;
  private notifyOutputChanged: () => void;
  private currentValue: object | null;
  private updatedByReact: boolean;
  private isControlDisabled: boolean;
  private isVisible: boolean;

  equivalent(parameters) {
    const { value } = parameters;
    return value && value.raw === this.currentValue;
  }

  sync(parameters) {
    const { value } = parameters;
    this.currentValue = (value && value.raw) || null;
  }

  constructor() {
    initializeIcons();
  }

  /**
   * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
   * Data-set values are not initialized here, use updateView.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
   * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
   * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
   * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
   */
  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement
  ) {
    const { parameters, mode } = context,
      { value } = parameters,
      { isControlDisabled, isVisible } = mode;

    this.container = container;
    this.notifyOutputChanged = notifyOutputChanged;
    this.currentValue = (value && value.raw) || null;
    this.updatedByReact = false;
    this.isControlDisabled = isControlDisabled;
    this.isVisible = isVisible;

    // Add control initialization code
    ReactDOM.render(
      // @ts-ignore
      React.createElement(SamplePCF, {
        // @ts-ignore
        value: this.value,
        disabled: this.isControlDisabled,
        hidden: !this.isVisible,
        onSampleChange: (val) => {
          this.currentValue = val;
          this.updatedByReact = true;
          this.notifyOutputChanged();
        },
      }),
      this.container
    );
  }

  /**
   * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
   */
  public updateView(context: ComponentFramework.Context<IInputs>): void {
    // Add code to update control view
    const { parameters, mode } = context,
      { isControlDisabled, isVisible } = mode;

    if (this.updatedByReact) {
      if (this.equivalent(parameters)) this.updatedByReact = false;

      return;
    }

    if (
      this.equivalent(parameters) &&
      this.isControlDisabled === isControlDisabled &&
      this.isVisible === isVisible
    )
      return;

    this.sync(parameters);
    this.isControlDisabled = isControlDisabled;
    this.isVisible = isVisible;

    ReactDOM.render(
      // @ts-ignore
      React.createElement(SamplePCF, {
        // @ts-ignore
        value: this.value,
        disabled: this.isControlDisabled,
        hidden: !this.isVisible,
        onSampleChange: (val) => {
          this.currentValue = val;
          this.updatedByReact = true;
          this.notifyOutputChanged();
        },
      }),
      this.container
    );
  }

  /**
   * It is called by the framework prior to a control receiving new data.
   * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
   */
  public getOutputs(): IOutputs {
    //@ts-ignore
    return { value: this.value };
  }

  /**
   * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
   * i.e. cancelling any pending remote calls, removing listeners, etc.
   */
  public destroy(): void {
    ReactDOM.unmountComponentAtNode(this.container);
  }
}
