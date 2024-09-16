export class TransformHelper {
  public static trim({ value }: { value: string }) {
    return value ? value.trim() : value;
  }
}
