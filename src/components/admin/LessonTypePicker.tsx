import { Lesson } from "@/utils/types";
import { LESSON_TYPE_DISPLAY } from "@/utils/lesson";
import { Button } from "@/components/ui/button";

type LessonTypePickerProps = {
  value: Lesson["type"];
  onChange: (type: Lesson["type"]) => void;
};

export function LessonTypePicker({ value, onChange }: LessonTypePickerProps) {
  const types = Object.keys(LESSON_TYPE_DISPLAY) as Lesson["type"][];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {types.map((type) => {
        const { icon: TypeIcon, label, color } = LESSON_TYPE_DISPLAY[type];
        const isActive = value === type;

        return (
          <Button
            key={type}
            type="button"
            variant="outline"
            size={null}
            onClick={() => onChange(type)}
            className={`h-auto cursor-pointer flex-col gap-2 rounded-lg p-6 text-base shadow-none transition-colors ${
              isActive
                ? "border-brand bg-brand-subtle hover:bg-brand-subtle"
                : "hover:bg-background border-gray-200 hover:border-gray-300"
            }`}
          >
            <TypeIcon className={`size-6 ${color}`} />
            <span className="capitalize">{label}</span>
          </Button>
        );
      })}
    </div>
  );
}
