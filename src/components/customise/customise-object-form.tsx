import { useEffect, useState } from "react";
import { NumberInput } from "./number-input";

export type CustomiseObjectFormField = {
  inputId: string;
  label: string;
  value: number;
};

export type CustomiseObjectFormProps = {
  fields: CustomiseObjectFormField[];
  onChange: (values: Record<string, number>) => void;
};

export function CustomiseObjectForm({
  fields,
  onChange,
}: CustomiseObjectFormProps) {
  const [values, setValues] = useState<Record<string, number>>(() => {
    const initialValues: Record<string, number> = {};
    fields.forEach((field) => {
      initialValues[field.inputId] = field.value;
    });
    return initialValues;
  });

  useEffect(() => {
    onChange(values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  const handleChange = (inputId: string, value: number) => {
    setValues((prev) => ({
      ...prev,
      [inputId]: value,
    }));
  };

  return (
    <div className="space-y-6">
      {fields.map((field) => (
        <div key={field.inputId} className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            {field.label}
          </label>
          <NumberInput
            value={values[field.inputId]}
            onChange={(value) => handleChange(field.inputId, value)}
          />
        </div>
      ))}
    </div>
  );
}
