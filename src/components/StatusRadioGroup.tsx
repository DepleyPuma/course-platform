import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type StatusRadioGroupProps = {
  idPrefix: string;
  publishedLabel: string;
  defaultValue?: "published" | "draft";
};

export function StatusRadioGroup({
  idPrefix,
  publishedLabel,
  defaultValue = "published",
}: StatusRadioGroupProps) {
  const publishedId = `${idPrefix}-status-published`;
  const draftId = `${idPrefix}-status-draft`;

  return (
    <RadioGroup name="status" defaultValue={defaultValue}>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="published" id={publishedId} />
        <Label htmlFor={publishedId} className="font-normal">
          {publishedLabel}
        </Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="draft" id={draftId} />
        <Label htmlFor={draftId} className="font-normal">
          Szkic
        </Label>
      </div>
    </RadioGroup>
  );
}
