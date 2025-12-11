export function downloadObject(
  objectName: string,
  adjustments: Record<string, number>
) {
  alert(
    `Downloading ${objectName} with adjustments: ${JSON.stringify(adjustments)}`
  );
}
