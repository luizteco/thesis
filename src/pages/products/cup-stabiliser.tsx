import {
  CustomiseObjectForm,
  type CustomiseObjectFormField,
} from "../../components/adjustments/customise-object-form";
import { downloadObject } from "../../components/download/download";

export function CupStabiliser() {
  const CustomiseObjectFormFields: CustomiseObjectFormField[] = [
    {
      label: "Width (mm)",
      inputId: "width",
      value: 10,
    },
    {
      label: "Height (mm)",
      inputId: "height",
      value: 10,
    },
    {
      label: "Depth (mm)",
      inputId: "depth",
      value: 30,
    },
  ];

  return (
    <div className="m-8">
      <div className="mb-4">
        <h1 className="font-bold">Cup Stabiliser</h1>
        <p className="text-gray-300">
          This is the cup stabiliser product detail page.
        </p>
      </div>
      <CustomiseObjectForm
        objectName="Cup Stabiliser"
        fields={CustomiseObjectFormFields}
        onSubmit={(values) => {
          downloadObject("cup-stabiliser", {
            width: values["width"],
            height: values["height"],
            depth: values["depth"],
          });
        }}
      />
    </div>
  );
}
