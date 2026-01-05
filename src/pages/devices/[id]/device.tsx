import {
  CustomiseObjectForm,
  type CustomiseObjectFormField,
} from "@components/customise/customise-object-form";
import { downloadObject } from "@components/download/download";
import { Preview } from "@components/object/preview";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useGetDeviceById } from "./use-get-device";

export type DeviceConfig = {
  name: string;
  id: string;
  previewStlPath: string;
  previewImagePath: string;
  description: string;
  // download configuration (optional)
  productType?: "cutlery" | "cup" | "button" | "bidet" | string;
  staticFiles?: string[];
  variablePattern?: string;
  variableParts?: string[];
  prefixUrl?: string;
  sizeTable?: Array<any>;
  handleYesParts?: string[];
  handleNoParts?: string[];
  includeInstructions?: boolean;
  previewImages?: string[];
};

export function Device() {
  const { id } = useParams<{ id: string }>();
  const device = useGetDeviceById(id!);
  const { t } = useTranslation();

  const [isDownloading, setIsDownloading] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: 10,
    height: 10,
    depth: 30,
    thickness: 2,
  });
  const [includeHandle, setIncludeHandle] = useState(true);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);

  const handleDimensionsChange = useCallback(
    (values: Record<string, number>) => {
      setDimensions({
        width: values.width,
        height: values.height,
        depth: values.depth,
        thickness: values.thickness ?? dimensions.thickness,
      });
    },
    [dimensions.thickness]
  );

  const CustomiseObjectFormFields: CustomiseObjectFormField[] = (() => {
    if (!device) return [];
    // No customization required for bidet
    if (device.productType === "bidet") return [];

    // Button: width + height only
    if (device.productType === "button") {
      return [
        { label: t("device.width"), inputId: "width", value: dimensions.width },
        { label: t("device.height"), inputId: "height", value: dimensions.height },
      ];
    }

    // Cup: height + thickness only
    if (device.productType === "cup") {
      return [
        { label: t("device.height"), inputId: "height", value: dimensions.height },
        { label: t("device.thickness"), inputId: "thickness", value: (dimensions as any).thickness },
      ];
    }

    // Cutlery: height + thickness only (width not required)
    if (device.productType === "cutlery") {
      return [
        { label: t("device.height"), inputId: "height", value: dimensions.height },
        { label: t("device.thickness"), inputId: "thickness", value: (dimensions as any).thickness },
      ];
    }

    // Fallback: width, height, depth
    return [
      { label: t("device.width"), inputId: "width", value: dimensions.width },
      { label: t("device.height"), inputId: "height", value: dimensions.height },
      { label: t("device.depth"), inputId: "depth", value: dimensions.depth },
    ];
  })();

  const handleDownload = async () => {
    if (!device) return;
    setIsDownloading(true);
    try {
      // eslint-disable-next-line no-console
      console.log("Device.download clicked", { id: device.id, dimensions, includeHandle });

      await downloadObject(
        device.id,
        dimensions,
        {
          productType: device.productType,
          staticFiles: device.staticFiles,
          variablePattern: device.variablePattern,
          variableParts: device.variableParts,
          prefixUrl: device.prefixUrl,
          sizeTable: (device as any).sizeTable,
          handleYesParts: device.handleYesParts,
          handleNoParts: device.handleNoParts,
          includeInstructions: device.includeInstructions,
          handlePattern: (device as any).handlePattern,
        },
        { includeHandle }
      );
    } catch (err: any) {
      // Show a friendly error to the user and log details to console
      // eslint-disable-next-line no-console
      console.error("Download failed:", err);
      alert(`Download failed: ${err?.message ?? String(err)}`);
    } finally {
      setIsDownloading(false);
    }
  };

  if (!device) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-linear-to-br from-gray-50 to-purple-50 flex justify-center items-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
          <p className="mt-4 text-gray-700">{t("device.loading")}</p>
        </div>
      </div>
    );
  }

  const printedImages = device.previewImages || (() => {
    if (device.id === "bidet") return ["/preview-images/bidet.png"];
    if (device.id === "button") return ["/preview-images/button.png"];
    if (device.id === "cup") return ["/preview-images/cup.png"];
    if (device.id === "cutlery") return ["/preview-images/cutlery.png"];
    return [device.previewImagePath];
  })();

  const getPrintingMaterials = () => {
    switch (device.id) {
      case "cutlery":
        return (
          <>
            <p><strong>Assembly:</strong> The cutlery grip comprises a body and interchangeable handle. Before printing, adapt the thickness (T parameter) to match the user's hand and strength.</p>
            <p><strong>Supports:</strong> Print with supports under the curved grip surfaces. Use tree supports to minimize contact marks on the grip surface.</p>
            <p><strong>Filament:</strong> Food-safe PLA or PETG. For food contact, use virgin food-safe material and ensure a clean nozzle to prevent contamination.</p>
            <p><strong>Layer height:</strong> 0.2 mm for smooth grip; 0.16 mm for better surface finish on the grip surfaces.</p>
            <p><strong>Wall/perimeters:</strong> 4–5 walls for durability; infill 20–30% gyroid or grid for strength without weight.</p>
            <p><strong>Bed adhesion:</strong> Use brim for adhesion; IPA clean bed ensures best surface quality for the grip.</p>
            <p><strong>Orientation:</strong> Grip surfaces upward; handles flat to minimize supports and ensure flat mating surfaces.</p>
          </>
        );
      case "cup":
        return (
          <>
            <p><strong>Assembly:</strong> The cup stabilizer comprises the main support sleeve, FlexStick positioning element, and Lock clip. Assemble in order: FlexStick first into the main support, then the Lock clip secures the assembly.</p>
            <p><strong>Supports:</strong> Minimal supports needed; the FlexStick is thin and may require light supports internally.</p>
            <p><strong>Filament:</strong> PLA or PETG recommended. TPU or flexible filament optional for the FlexStick for better grip.</p>
            <p><strong>Layer height:</strong> 0.2 mm standard; 0.16 mm for the Lock clip to ensure tight fit.</p>
            <p><strong>Wall/perimeters:</strong> 3–4 walls; infill 20% gyroid for lightweight design while maintaining rigidity.</p>
            <p><strong>Bed adhesion:</strong> Use brim for the larger support piece; keep bed clean for best adhesion.</p>
            <p><strong>Orientation:</strong> Support sleeve upright, walls parallel to Z-axis; Lock clip standing flat for precise dimension.</p>
          </>
        );
      case "button":
        return (
          <>
            <p><strong>Assembly:</strong> The Button Aid comprises two shaft parts (sa and sb) joined by a Pin.stl post. Assembly: Insert the Pin into the shaft parts to form the completed hook tool.</p>
            <p><strong>Supports:</strong> The hook end may require light supports if overhangs exceed 45°; pin bore area needs minimal support.</p>
            <p><strong>Filament:</strong> PLA recommended for rigidity; PETG for added durability and flexibility at the hook.</p>
            <p><strong>Layer height:</strong> 0.2 mm standard; 0.16 mm for the pin bore to ensure tight assembly fit.</p>
            <p><strong>Wall/perimeters:</strong> 4–5 walls for strength; infill 20–30% gyroid or grid to prevent deformation under pull force.</p>
            <p><strong>Bed adhesion:</strong> Use brim for all parts, especially the thin hook end; clean bed (IPA) for best adhesion.</p>
            <p><strong>Orientation:</strong> Shafts standing upright, hook angled for minimal supports; pin bore bore horizontal for best fit tolerances.</p>
          </>
        );
      case "bidet":
        return (
          <>
            <p><strong>Assembly:</strong> The bidet is a single-piece design ready to use after post-processing (smoothing, sealing).</p>
            <p><strong>Supports:</strong> Support the inlet valve area and water passages; use soluble supports if available for easier removal.</p>
            <p><strong>Filament:</strong> PETG or ABS recommended for water resistance and durability. Ensure material is FDA food-safe or suitable for water contact.</p>
            <p><strong>Layer height:</strong> 0.2 mm standard; 0.16 mm for internal passages to ensure water tightness.</p>
            <p><strong>Wall/perimeters:</strong> 5–6 walls for water-tight integrity; infill 30–40% gyroid to prevent warping and ensure structural strength.</p>
            <p><strong>Bed adhesion:</strong> Use brim for the entire base; this is a large part requiring solid adhesion.</p>
            <p><strong>Orientation:</strong> Inlet up, outlet down to minimize supports in critical water passages; post-process by sealing internal surfaces with food-safe epoxy or PET coating to ensure water tightness.</p>
          </>
        );
      default:
        return (
          <>
            <p><strong>Supports:</strong> Enable supports only where touching the build plate unless your slicer reports overhangs beyond 60°.</p>
            <p><strong>Filament:</strong> PLA or PETG recommended. For food contact, use food-safe PLA and a clean nozzle.</p>
            <p><strong>Layer height:</strong> 0.2 mm standard; 0.16 mm for smoother grip surfaces.</p>
            <p><strong>Wall/perimeters:</strong> 3–4 walls; infill 20–30% gyroid or grid.</p>
            <p><strong>Bed adhesion:</strong> Use a brim for tall parts; keep bed clean (IPA) for best adhesion.</p>
            <p><strong>Orientation:</strong> Place grip surfaces upward to minimize supports; keep mating faces flat on the bed.</p>
          </>
        );
    }
  };

  const openViewer = (index: number) => {
    setViewerIndex(index);
    setViewerOpen(true);
  };

  const closeViewer = () => setViewerOpen(false);

  const nextImage = () => {
    setViewerIndex((prev) => (prev + 1) % printedImages.length);
  };

  const prevImage = () => {
    setViewerIndex((prev) => (prev - 1 + printedImages.length) % printedImages.length);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-linear-to-br from-gray-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 order-2 lg:order-1">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <h1 className="text-4xl font-bold text-black mb-3">
                {t(`devices.${device.id}.name`, { defaultValue: device.name })}
              </h1>
              <p className="text-lg text-gray-700">{t(`devices.${device.id}.description`, { defaultValue: device.description })}</p>

              {CustomiseObjectFormFields.length > 0 ? (
                <>
                  <h2 className="text-xl font-bold text-black mb-6">{t("device.customizeDimensions")}</h2>
                  <CustomiseObjectForm fields={CustomiseObjectFormFields} onChange={handleDimensionsChange} />
                </>
              ) : (
                <div className="mt-4 text-gray-700">{t("device.noCustomization")}</div>
              )}
              {device.productType === "cutlery" && (
                <div className="mt-4 flex items-center gap-3">
                  <input
                    id="include-handle"
                    type="checkbox"
                    checked={includeHandle}
                    onChange={(e) => setIncludeHandle(e.target.checked)}
                    className="h-4 w-4"
                  />
                  <label htmlFor="include-handle" className="text-gray-700">
                    {t("device.includeHandle")}
                  </label>
                </div>
              )}
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="mt-8 w-full px-6 py-4 bg-purple-500 text-white font-semibold rounded-xl hover:bg-purple-700 shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDownloading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    {t("device.downloading")}
                  </span>
                ) : (
                  t("device.download", { name: device.name })
                )}
              </button>

              <div className="mt-8 space-y-4">
                <div className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
                  <button className="w-full text-left px-4 py-3 font-semibold text-black flex items-center justify-between">
                    <span>Printed Examples</span>
                    <span className="text-sm text-gray-500">(click to view)</span>
                  </button>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4">
                    {printedImages.map((src, idx) => (
                      <img
                        key={src}
                        src={src}
                        alt={`Printed example for ${device.name}`}
                        className="w-full rounded-lg border border-gray-200 object-cover cursor-pointer hover:shadow-lg transition-shadow"
                        onClick={() => openViewer(idx)}
                      />
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
                  <button className="w-full text-left px-4 py-3 font-semibold text-black flex items-center justify-between">
                    <span>Printing & Materials</span>
                    <span className="text-sm text-gray-500">(scrollable)</span>
                  </button>
                  <div className="max-h-48 overflow-y-auto px-4 pb-4 space-y-2 text-gray-700 text-sm">
                    {getPrintingMaterials()}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-full order-1 lg:order-2">
            <Preview stlPath={device.previewStlPath} productId={device.id} />
          </div>
        </div>
      </div>
      {viewerOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex flex-col items-center justify-center px-4">
          <div className="relative max-w-5xl w-full">
            <button
              onClick={closeViewer}
              className="absolute -top-10 right-0 text-white text-lg font-semibold px-3 py-1 rounded-full bg-white/20 hover:bg-white/30"
            >
              Close
            </button>
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
              <img
                src={printedImages[viewerIndex]}
                alt={`Printed example ${viewerIndex + 1}`}
                className="w-full h-[70vh] object-contain bg-black"
              />
              {printedImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-black rounded-full p-3 shadow"
                  >
                    ‹
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-black rounded-full p-3 shadow"
                  >
                    ›
                  </button>
                </>
              )}
            </div>
            <div className="mt-4 flex justify-center gap-2 text-white text-sm">
              {printedImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setViewerIndex(idx)}
                  className={`h-2 w-2 rounded-full ${idx === viewerIndex ? "bg-white" : "bg-white/40"}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
