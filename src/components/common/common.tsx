import Course from "types/Course";
import User from "types/User";
import { ItemParam, SelectOption } from "types/common/Item";

export const selectItem = (listItems: ItemParam[], noNoneOption?: boolean) => {
  const selectOptions: JSX.Element[] = [];
  if (!noNoneOption) {
    selectOptions.push(
      <option key={0} value={0}>
        --
      </option>
    );
  }
  listItems.forEach((item) => {
    selectOptions.push(
      <option key={item.id} value={item.id}>
        {item.name}
      </option>
    );
  });
  return selectOptions;
};

export const convertToSelectOptions = (items: Course[]) => {
  const selectOptions: SelectOption[] = [];
  items.forEach((item) => {
    selectOptions.push({
      value: item.id!,
      label: item.name!,
    });
  });
  return selectOptions;
};

export const convertToSelectOptionsUser = (items: User[]) => {
  const selectOptions: SelectOption[] = [];
  items.forEach((item) => {
    selectOptions.push({
      value: item.id!,
      label: item.useName!,
    });
  });
  return selectOptions;
};
