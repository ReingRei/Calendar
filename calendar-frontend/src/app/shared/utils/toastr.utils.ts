import { IndividualConfig, ToastrService } from 'ngx-toastr';

export class ToastrUtils {
  private static _toastr: ToastrService;
  static init(toastr: ToastrService): void {
    this._toastr = toastr;
  }

  static success(
    message?: string,
    title?: string,
    override?: Partial<IndividualConfig>
  ): void {
    this._toastr.success(message, title, override);
  }

  static error(
    message?: string,
    title?: string,
    override?: Partial<IndividualConfig>
  ): void {
    this._toastr?.error(message, title, override);
  }

  static info(
    message?: string,
    title?: string,
    override?: Partial<IndividualConfig>
  ): void {
    this._toastr.info(message, title, override);
  }

  static warning(
    message?: string,
    title?: string,
    override?: Partial<IndividualConfig>
  ): void {
    this._toastr.warning(message, title, override);
  }
}
