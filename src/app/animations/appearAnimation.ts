import { animate, animation, keyframes, style } from "@angular/animations";

export const appearAnimation = animation([
    style({ marginTop: '{{ hideDist }}' }),
    animate('{{ time }} {{ delay }}', keyframes([
        style({
            marginTop: '{{ hideDist }}',
            opacity: '{{ fadePercent }}',
            offset: '0'
        }),
        style({
            marginTop: '*',
            opacity: '1',
            offset: '1'
        })
    ]))
]);