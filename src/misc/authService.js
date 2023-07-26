module.exports = {
    setUserSession: function (user) { sessionStorage.setItem('user', JSON.stringify(user)); },
    getUser: function () {
        const user = sessionStorage.getItem('user');
        if (user === 'undefined' || !user) { return null; }
        else { return JSON.parse(user); }
    },
    resetUserSession: function () { sessionStorage.removeItem('user'); }
}