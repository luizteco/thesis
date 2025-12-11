import type { FormEvent } from "react";
import { useState } from "react";
import { NumberInput } from "./number-input";

export type CustomiseObjectFormField = {
  inputId: string;
  label: string;
  value: number;
};

export type CustomiseObjectFormProps = {
  fields: CustomiseObjectFormField[];
  objectName: string;
  onSubmit: (values: Record<string, number>) => void;
};

export function CustomiseObjectForm({
  fields,
  objectName,
  onSubmit,
}: CustomiseObjectFormProps) {
  const [values, setValues] = useState<Record<string, number>>(() => {
    const initialValues: Record<string, number> = {};
    fields.forEach((field) => {
      initialValues[field.inputId] = field.value;
    });
    return initialValues;
  });

  const handleChange = (inputId: string, value: number) => {
    setValues((prev) => ({
      ...prev,
      [inputId]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((field) => (
        <div className="flex w-52 justify-between">
          <label className="text-gray-300">{field.label}</label>
          <NumberInput
            key={field.inputId}
            value={values[field.inputId]}
            onChange={(value) => handleChange(field.inputId, value)}
          />
        </div>
      ))}
      <button
        type="submit"
        className=" px-1 bg-purple-300 text-black cursor-pointer"
      >
        Download {objectName}
      </button>
    </form>
  );
}
