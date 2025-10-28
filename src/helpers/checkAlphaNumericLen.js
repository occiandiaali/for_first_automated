export function isAlphanumericLength8(str) {
    const regex = /^[A-Za-z0-9]{8}$/;
    return regex.test(str);
}