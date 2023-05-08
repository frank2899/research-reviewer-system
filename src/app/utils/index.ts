export const convertToMonth = (num : number) => {
    if(num === 1) return 'Jan'
    if(num === 2) return 'Feb'
    if(num === 3) return 'Mar'
    if(num === 4) return 'Apr'
    if(num === 5) return 'May'
    if(num === 6) return 'June'
    if(num === 7) return 'July'
    if(num === 8) return 'Aug'
    if(num === 9) return 'Sept'
    if(num === 10) return 'Oct'
    if(num === 11) return 'Nov'
    if(num === 12) return 'Desc'

    return ''
}

export const validateNistPassword = (password: string) => {
    const min_length: number = 8;
    const max_length: number = 64;
    const min_uppercase: number = 1;
    const min_lowercase: number = 1;
    const min_digits: number = 1;
    const min_symbols: number = 1;
  
    // Check the length of the password
    if (password.length < min_length || password.length > max_length) {
      return `The password must be between ${min_length} and ${max_length} characters long.`;
    }
  
    // Check the number of uppercase letters
    let uppercaseCount: number = password.replace(/[^A-Z]/g, '').length;
    if (uppercaseCount < min_uppercase) {
      return `The password must contain at least ${min_uppercase} uppercase letter${min_uppercase > 1 ? 's' : ''}.`;
    }
  
    // Check the number of lowercase letters
    let lowercaseCount: number = password.replace(/[^a-z]/g, '').length;
    if (lowercaseCount < min_lowercase) {
      return `The password must contain at least ${min_lowercase} lowercase letter${min_lowercase > 1 ? 's' : ''}.`;
    }
  
    // Check the number of digits
    let digitCount: number = password.replace(/[^0-9]/g, '').length;
    if (digitCount < min_digits) {
      return `The password must contain at least ${min_digits} digit${min_digits > 1 ? 's' : ''}.`;
    }
  
    // Check the number of symbols
    let symbolCount: number = password.replace(/[A-Za-z0-9]/g, '').length;
    if (symbolCount < min_symbols) {
      return `The password must contain at least ${min_symbols} symbol${min_symbols > 1 ? 's' : ''}.`;
    }
  
    // The password meets all the NIST guidelines
    return true;
  }