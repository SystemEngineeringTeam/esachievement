// @ts-expect-error: `MessageParams` is not exported by `yup`.
import { type MessageParams } from "yup";
import * as yup from "yup";

function labelText(prm: MessageParams): string {
  return prm.label != null ? `${prm.label}は` : "";
}

const jpConfig = {
  mixed: {
    default: (prm: MessageParams) => `${labelText(prm)}無効です`,
    required: (prm: MessageParams) => `${labelText(prm)}必須の入力項目です`,
    oneOf: (prm: MessageParams & { values: any }) =>
      `${labelText(prm)}次の値のいずれかでなければなりません:${prm.values}`,
    notOneOf: (prm: MessageParams & { values: any }) =>
      `${labelText(prm)}次の値のいずれかであってはなりません:${prm.values}`,
    notType: `形式が違います`,
    defined: "",
  },
  string: {
    length: (prm: MessageParams & { length: number }) =>
      `${labelText(prm)}${prm.length}文字でなければなりません`,
    min: (prm: MessageParams & { min: number }) =>
      `${labelText(prm)}少なくとも${prm.min}文字でなければなりません`,
    max: (prm: MessageParams & { max: number }) =>
      `${labelText(prm)}最大${prm.max}文字でなければなりません`,
    matches: (prm: MessageParams & { regex: RegExp }) =>
      `${labelText(prm)}次の形式と一致する必要があります: "${prm.regex}"`,
    email: (prm: MessageParams & { regex: RegExp }) =>
      `${labelText(prm)}メールアドレス形式である必要があります`,
    url: (prm: MessageParams & { regex: RegExp }) =>
      `${labelText(prm)}有効なURLでなければなりません`,
    uuid: (prm: MessageParams & { regex: RegExp }) =>
      `${labelText(prm)}有効なUUIDでなければなりません`,
    trim: (prm: MessageParams) =>
      `${labelText(prm)}前後にスペースを入れてはいけません`,
    lowercase: (prm: MessageParams) =>
      `${labelText(prm)}小文字でなければなりません`,
    uppercase: (prm: MessageParams) =>
      `${labelText(prm)}大文字でなければなりません`,
  },
  number: {
    min: (prm: MessageParams & { min: number }) =>
      `${labelText(prm)}${prm.min}以上である必要があります`,
    max: (prm: MessageParams & { max: number }) =>
      `${labelText(prm)}${prm.max}以下でなければなりません`,
    lessThan: (prm: MessageParams & { less: number }) =>
      `${labelText(prm)}${prm.less}より小さくなければなりません`,
    moreThan: (prm: MessageParams & { more: number }) =>
      `${labelText(prm)}${prm.more}より大きくなければなりません`,
    positive: (prm: MessageParams & { more: number }) =>
      `${labelText(prm)}正の数でなければなりません`,
    negative: (prm: MessageParams & { less: number }) =>
      `${labelText(prm)}負の数でなければなりません`,
    integer: (prm: MessageParams) =>
      `${labelText(prm)}整数でなければなりません`,
  },
  date: {
    min: (prm: MessageParams & { min: Date | string }) =>
      `${labelText(prm)}${prm.min}より後でなければなりません`,
    max: (prm: MessageParams & { max: Date | string }) =>
      `${labelText(prm)}${prm.max}より前でなければなりません`,
  },
  boolean: {
    isValue: (prm: MessageParams) => `${labelText(prm)}値が必要です`,
  },
  object: {
    noUnknown: (prm: MessageParams) =>
      `${labelText(prm)}オブジェクトシェイプで指定されていないキーを含めることはできません`,
  },
  array: {
    length: (prm: MessageParams & { length: number }) =>
      `${labelText(prm)}${prm.length}個が必要です`,
    min: (prm: MessageParams & { min: number }) =>
      `${labelText(prm)}${prm.min}個以上の項目が必要です`,
    max: (prm: MessageParams & { max: number }) =>
      `${labelText(prm)}${prm.max}個以下の項目が必要です`,
  },
};

yup.setLocale(jpConfig);
export default yup;
