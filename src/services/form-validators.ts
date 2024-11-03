export class ValidatorService {
  static min(value: string, min: number) {
    if (value.length < min) return `Please type at least ${min} characters`;
  }

  static max(value: string, max: number) {
    if (value.length > max) return `You can't type more than ${max} characters`;
  }

  static emailRegex(value: string) {
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!regex.test(value)) {
      return "Please type a valid email format";
    }
  }

  static passwordRegex(value: string) {
    const regex = /^[\w\-.!#$%&'*+/=?^_`{|}~]+$/;
    if (!regex.test(value)) {
      return "Only letters (at least one uppercase) and numbers are allowed";
    }
  }

  static notSame(valueA: string, valueB: string) {
    if (valueA !== valueB) {
      return "Passwords should match";
    }
  }
}
