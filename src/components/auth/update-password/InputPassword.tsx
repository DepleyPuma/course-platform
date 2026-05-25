import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type InputPasswordTypes = {
  name: string;
  labelText: string;
};

export default function InputPassword({ name, labelText }: InputPasswordTypes) {
  const [password, setPassword] = useState("");
  const [isShown, setIsShown] = useState(false);

  const togglePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsShown((prevState) => !prevState);
  };

  return (
    <Label
      htmlFor={name}
      className="text-md relative flex flex-col items-start gap-2"
    >
      {labelText}
      <Input
        type={isShown ? "text" : "password"}
        name={name}
        id={name}
        className="rounded-md border py-6 lg:text-lg"
        placeholder="••••••••••••"
        defaultValue={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        type="button"
        onClick={togglePassword}
        size="sm"
        variant="ghost"
        className="absolute top-10 right-4 cursor-pointer"
      >
        {isShown ? <EyeOff /> : <Eye />}
      </Button>
    </Label>
  );
}
