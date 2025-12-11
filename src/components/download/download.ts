import type { Dimensions, ObjectName } from "../object/object";
import { FILE_PATTERN, INSTRUCTIONS_FILE, PREFIX_URL } from "./download.config";
import { packageZip } from "./zip";

function getMainPath(objectName: ObjectName, dimensions: Dimensions) {
  return (
    PREFIX_URL +
    `/${objectName}/` +
    FILE_PATTERN.replace("{w}", dimensions.width.toString())
      .replace("{h}", dimensions.height.toString())
      .replace("{d}", dimensions.depth.toString())
  );
}

function getInstructionsPath(objectName: ObjectName) {
  return `${PREFIX_URL}/${objectName}/${INSTRUCTIONS_FILE}`;
}

function getExtrasPaths(
  objectName: ObjectName,
  extraFiles: string[]
): string[] {
  return extraFiles.map((file) =>
    `${PREFIX_URL}/${objectName}/${file}`.replace("{file}", file)
  );
}

export async function downloadObject(
  objectName: ObjectName,
  dimensions: Dimensions
) {
  const mainPath = getMainPath(objectName, dimensions);
  const instructionsPath = getInstructionsPath(objectName);
  const extraFilesPaths = getExtrasPaths(objectName, []);

  const packagedZip = await packageZip([
    mainPath,
    instructionsPath,
    ...extraFilesPaths,
  ]);

  const a = document.createElement("a");
  a.href = URL.createObjectURL(packagedZip);
  a.download = `${objectName}.zip`;
  a.click();
  URL.revokeObjectURL(a.href);
}
