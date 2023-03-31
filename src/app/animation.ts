import { animate, animateChild, group, query, style, transition, trigger } from "@angular/animations";

export const routeAnimate =
    trigger('routerAnim', [
        transition('* <=> *', [
            style({ position: 'relative' }),
            query(':enter, :leave', [
                style({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%'
                })
            ]),
            query(':enter:not(.login-page):not(.register-page)', [style({ top: '-100%', opacity: 0 })]),
            query(':leave:not(.login-page):not(.register-page)', animateChild()),
            group([
                query(':leave:not(.login-page):not(.register-page)', [animate('500ms ease-out', style({ top: '100%', opacity: 0 }))]),
                query(':enter', [animate('500ms ease-out', style({ top: '0%', opacity: 1 }))])
            ]),
            query(':enter:not(.login-page):not(.register-page)', animateChild())
        ])
    ])