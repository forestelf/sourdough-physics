"use strict";
/**
 * SourdoughPhysics
 * Open computational dough rheology, True Total Hydration correction,
 * and latent heat ice thermodynamics for artisan sourdough bakers.
 *
 * Web app: https://sourdoughcalc.app
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./hydration.js"), exports);
__exportStar(require("./thermodynamics.js"), exports);
__exportStar(require("./geometry.js"), exports);
__exportStar(require("./rheology.js"), exports);
