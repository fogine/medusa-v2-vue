import { isEmpty } from "lodash";
import { RegionInfo } from "../types";

type FormatAmountParams = {
  amount: number;
  region: RegionInfo;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  locale?: string;
};

/**
 * Takes an amount and a region, and converts the amount to a localized decimal format
 */
export const formatAmount = ({
  amount,
  region,
  ...rest
}: FormatAmountParams) => {
  return convertToLocale({
    amount,
    currency_code: region.currency_code,
    ...rest,
  });
};

const convertToLocale = ({
  amount,
  currency_code,
  minimumFractionDigits,
  maximumFractionDigits,
  locale = "en-US",
}: ConvertToLocaleParams) => {
  return currency_code && !isEmpty(currency_code)
    ? new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency_code,
        minimumFractionDigits,
        maximumFractionDigits,
      }).format(amount)
    : amount.toString();
};

type ConvertToLocaleParams = {
  amount: number;
  currency_code: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  locale?: string;
};
