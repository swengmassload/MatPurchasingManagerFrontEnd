export interface IStandardUnits {
  code: string;
  name: string;
}
export class StandardUnits {
  public static readonly milliVoltPerVolt: IStandardUnits = { name: "milliVoltPerVolt", code: "mV/V" };
  public static readonly kilograms: IStandardUnits = { name: "Kilogrammes", code: "kg" };
  public static readonly volts: IStandardUnits = { name: "Volts", code: "V" };
  public static readonly ohms: IStandardUnits = { name: "Ohms", code: "Ω" };
  public static readonly pounds: IStandardUnits = { name: "Pounds", code: "lbs" };
  public static readonly milliAmpere: IStandardUnits = { name: "MilliAmpere", code: "mA" };
}

export const AllOutputUnitTypes = [StandardUnits.milliVoltPerVolt, StandardUnits.milliAmpere, StandardUnits.volts,StandardUnits.pounds, StandardUnits.kilograms, StandardUnits.ohms];

export class InspectionConclusion {
  public static readonly PASS: string = "PASS";
  public static readonly FAIL: string = "FAIL";
  public static readonly COMPLETED: string = "COMPLETED";
  public static readonly TRIM: string = "TRIM";
}

export const DUT_ZERO_OUTPUT_TOLERANCE = 0.15;
export const RESISTANCE_TOLERANCE = 15;

export const DetermineInspectionResult = (consulsion: InspectionConclusion): boolean => {
  return consulsion === InspectionConclusion.PASS || consulsion === InspectionConclusion.COMPLETED ? true : false;
};

export class Tester_HardCodedName {
  public static readonly Automatic_Hydraulic_Tester: string = "Automatic Hydraulic Tester";
  public static readonly Dead_Load_Tester: string = "Dead Load Tester";
  public static readonly Old_Grey_Hydraulic_Tester: string = "Old Grey Hydraulic Tester";
}



export interface IGeneralCertificateTypes {
  displayName: string;
  code: string;
}
export class GeneralCertificateTypes {
  public static readonly StandardCertificate: IGeneralCertificateTypes = { displayName: "StandardCertificate", code: "StandardCertificate" };
  public static readonly ZeroToTen: IGeneralCertificateTypes = { displayName: "0-10", code: "ZeroToTen" };

  public static readonly FourToTwenty: IGeneralCertificateTypes = { displayName: "4-20", code: "FourToTwenty" };

  public static readonly MatraCourt: IGeneralCertificateTypes = { displayName: "Mantracourt", code: "Mantracourt" };

  public static readonly Others: IGeneralCertificateTypes = { displayName: "Others", code: "Other" };

  public static readonly WesternScale: IGeneralCertificateTypes = { displayName: "WesternScale", code: "WesternScale" };


}
