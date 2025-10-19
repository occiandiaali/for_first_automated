export function getUserRole() {
    return localStorage.getItem('userRole')
}

export function storeUserRole(role) {
    localStorage.setItem('userRole', role)
}

export function storeUsername(name) {
    localStorage.setItem('userName', name)
}

export function getUserName() {
    return localStorage.getItem('userName')
}

export function logoutUser() {
    localStorage.removeItem('jwToken')
    localStorage.removeItem('userRole')
    localStorage.removeItem('userName')
}