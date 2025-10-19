export function isAuthenticated() {
    const token = localStorage.getItem('jwToken');
    return token !== null
}