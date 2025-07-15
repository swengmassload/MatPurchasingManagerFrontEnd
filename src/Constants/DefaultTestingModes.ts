interface DefaultTestingMode {
  code: string;

}

export class DefaultTestingModes {
  public static readonly Manual: DefaultTestingMode = {
    code: "MANUAL",
  };
  public static readonly Auto: DefaultTestingMode = {
    code: "AUTOMATIC",
  };
}

export const AllTestingModes = [DefaultTestingModes.Manual, DefaultTestingModes.Auto];