/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { XHR } from '@angular/compiler';
import { BaseException } from '../facade/exceptions';
import { global } from '../facade/lang';
/**
 * An implementation of XHR that uses a template cache to avoid doing an actual
 * XHR.
 *
 * The template cache needs to be built and loaded into window.$templateCache
 * via a separate mechanism.
 */
export class CachedXHR extends XHR {
    constructor() {
        super();
        this._cache = global.$templateCache;
        if (this._cache == null) {
            throw new BaseException('CachedXHR: Template cache was not found in $templateCache.');
        }
    }
    get(url) {
        if (this._cache.hasOwnProperty(url)) {
            return Promise.resolve(this._cache[url]);
        }
        else {
            return Promise.reject('CachedXHR: Did not find cached template for ' + url);
        }
    }
}
//# sourceMappingURL=xhr_cache.js.map