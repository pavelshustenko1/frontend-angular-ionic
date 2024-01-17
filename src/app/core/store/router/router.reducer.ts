import { Params, RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';

export interface RouterState {
  url: string;
  params: Params;
  queryParams: Params;
}

export class RouterCustomSerializer
  implements RouterStateSerializer<RouterState>
{
  serialize(routerState: RouterStateSnapshot): RouterState {
    const { url } = routerState;
    const queryParams = routerState.root.queryParams;

    let route = routerState.root;
    while (route.firstChild) {
      route = route.firstChild;
    }

    const params = route.params;
    return { url, params, queryParams };
  }
}
