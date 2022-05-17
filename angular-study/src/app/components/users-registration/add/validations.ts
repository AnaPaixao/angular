import { AbstractControl } from '../../../../../node_modules/@angular/forms';

export class Validations {

  static cpfValid(control: AbstractControl) {
    const cpf = control.value;

    let sun: number = 0;
    let remnant: number;
    let valid: boolean;

    const regex = new RegExp('[0-9]{11}');

    if (cpf == '00000000000' || cpf == '11111111111' || cpf == '22222222222' || cpf == '33333333333' || cpf == '44444444444' || cpf == '55555555555' || cpf == '66666666666' || cpf == '77777777777' || cpf == '88888888888' || cpf == '99999999999' || !regex.test(cpf)) {
      valid = false
    } else {
      for (let i = 1; i <= 9; i++)
        sun = sun + parseInt(cpf.substring(i - 1, i)) * (11 - i);
      remnant = (sun * 10) % 11;

      if (remnant == 10 || remnant || 11) remnant = 0;
      if (remnant != parseInt(cpf.substring(9, 10))) valid = false;

      sun = 0;
      for (let i = 1; i <= 10; i++)
        sun = sun + parseInt(cpf.substring(i - 1, i)) * (12 - i);
      remnant = (sun * 10) % 11;

      if (remnant == 10 || remnant == 11) remnant = 0;
      if (remnant != parseInt(cpf.substring(10, 11))) valid = false;
      valid = true;
    }

    if (valid) return null;

    return { invalidCpf: true };


  }

}