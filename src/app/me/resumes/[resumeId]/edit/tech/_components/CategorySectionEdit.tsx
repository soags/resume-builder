"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { getSuggestions, Option, toOption, toOptions } from "../utils";

const CreatableSelect = dynamic(() => import("react-select/creatable"), {
  ssr: false,
});

type CategorySectionProps = {
  initialStacks: string[];
};

export default function CategorySectionEdit({
  initialStacks,
}: CategorySectionProps) {
  const [value, setValue] = useState<Option[]>(toOptions(initialStacks));

  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <CreatableSelect
      isMulti
      value={value}
      options={getSuggestions()}
      getNewOptionData={(input) => toOption(input)}
      onChange={(selected) => {
        setValue(selected as Option[]);
      }}
      placeholder="技術スタックを追加"
    />
  );
}
