export class TransformHelper {
  public static trim({ value }: { value: string }) {
    return value ? value.trim() : value;
  }
  public static toUpperCase({ value }: { value: string }) {
    return value ? value.toUpperCase() : value;
  }
}
