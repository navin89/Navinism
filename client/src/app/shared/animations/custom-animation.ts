import {trigger, sequence, state, animate, transition, style, group} from "@angular/animations";

export const rowsAnimation =
  trigger('rowsAnimation', [
      transition('void => *', [
        style({height: '*', opacity: '0', transform: 'translate(-500px)', 'box-shadow': 'none'}),
        sequence([
          animate(".15ease", style({height: '*', opacity: '.2', transform: 'translate(0)', 'box-shadow': 'none'})),
          animate(".15ease", style({height: '*', opacity: 1, transform: 'translate(0)'}))
        ])
      ])
    ]);


export const slideInOutAnimation =
  trigger('slideInOutAnimation', [
      state('in', style({
        'opacity': '1', 'visibility': 'visible', 'height': '20px', 'padding': '5px'
      })),
      state('out', style({
        'opacity': '0', 'visibility': 'hidden', 'height': '0px', 'padding': '0px'
      })),
      state('up', style({
        'transform': 'translateY(-56px)',
        'height': '0px'
      })),
      transition('in => out', animate('300ms ease-in-out')),
      transition('out => in', animate('700ms ease-in-out')),
      transition('up => down', animate('700ms ease-in-out')),
      transition('down => up', animate('500ms ease-in-out')),
  ]);



export const showHideAnimation =
  trigger('showHideAnimation', [
      state('show', style({
        'display': 'table-cell',
        'height': '20px',
        'padding': '5px'
      })),
      state('hide', style({
        'display': 'none',
        'height': '0px',
        'padding': '0px'
      })),

      transition('hide => show', group([
          animate('100ms 600ms ease-in', style({'display': 'table-cell'})),
          animate('400ms 600ms ease-in', style({'height': '20px', 'padding': '5px'}))
        ])
      )
  ]);
