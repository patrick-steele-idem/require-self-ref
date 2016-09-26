'use strict';
var lassoPackageRoot = require('lasso-package-root');
var Module = require('module').Module;
var oldResolveFilename = Module._resolveFilename;
var installedMarker = '__require-self-ref-installed';

if (!Module[installedMarker]) {
    Object.defineProperty(Module, installedMarker, {
        value: true
    });

    Module._resolveFilename = function(request, parent, isMain) {
        if (request.charAt(0) !== '.') {
            var firstSlash = request.indexOf('/');
            var targetPackageName = firstSlash === -1 ? request : request.substring(0, firstSlash);

            var currentPackage = lassoPackageRoot.getRootPackage(parent.filename);
            if (currentPackage && (targetPackageName === '~' || currentPackage.name === targetPackageName)) {
                var actualRequest = firstSlash === -1 ?
                    currentPackage.__dirname :
                    currentPackage.__dirname + request.substring(firstSlash);
                return oldResolveFilename.call(this, actualRequest, parent, isMain);
            }
        }

        return oldResolveFilename.call(this, request, parent, isMain);
    };
}
