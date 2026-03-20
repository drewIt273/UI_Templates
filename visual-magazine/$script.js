/**
 * Instance by DrewIt
 */

HTMLElement.prototype.toggleState = function (a, b) {
    if (this.getAttribute('data-state') === a) this.setAttribute('data-state', b)
    else this.setAttribute('data-state', a)
}
