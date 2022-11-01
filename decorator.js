/**
 * In object-oriented programming, the decorator pattern is a design
 * pattern that allows behavior to be added to an individual object,
 * dynamically, without affecting the behavior of other objects from the
 * same class.[1] The decorator pattern is often useful for adhering to
 * the Single Responsibility Principle, as it allows functionality to be
 * divided between classes with unique areas of concern.[2] Decorator
 * use can be more efficient than subclassing, because an object's
 * behavior can be augmented without defining an entirely new object.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var componentRegistry = {};
function Component(metadata) {
    return function (constructor) {
        var _a;
        componentRegistry[constructor.name] = metadata;
        window.document
            .querySelectorAll(metadata.selector)
            .forEach(function (element) { return (element.innerHTML = metadata.template); });
        (_a = constructor.prototype) === null || _a === void 0 ? void 0 : _a.afterViewInit();
    };
}
function Input() {
    return function (target, propertyKey) {
        /**
         * `setTimeout`ing to get the value of `componentRegistry`. Probably
         * not a clean solution
         */
        setTimeout(function () {
            window.document
                .querySelectorAll(componentRegistry[target.constructor.name].selector)
                .forEach(function (element) {
                target[propertyKey] = element.getAttribute(propertyKey);
            });
            target === null || target === void 0 ? void 0 : target.afterViewChecked();
        });
    };
}
function Module(metadata) {
    return function (constructor) {
        metadata.declarations.forEach(function (declaration) { return new declaration(); });
    };
}
var GreetingComponent = /** @class */ (function () {
    function GreetingComponent() {
    }
    GreetingComponent.prototype.afterViewInit = function () {
        console.log('GreetingComponent.afterViewInit called');
    };
    GreetingComponent.prototype.afterViewChecked = function () {
        console.log('GreetingComponent.afterViewChecked', 'this.foo:', this.foo);
    };
    __decorate([
        Input()
    ], GreetingComponent.prototype, "foo");
    GreetingComponent = __decorate([
        Component({
            selector: 'app-greeting',
            template: '<p>Hi</p>'
        })
    ], GreetingComponent);
    return GreetingComponent;
}());
var ListComponent = /** @class */ (function () {
    function ListComponent() {
    }
    ListComponent.prototype.afterViewInit = function () {
        console.log('ListComponent.afterViewInit called');
    };
    ListComponent.prototype.afterViewChecked = function () {
        console.log('ListComponent.afterViewChecked', 'this.bar:', this.bar);
    };
    __decorate([
        Input()
    ], ListComponent.prototype, "bar");
    ListComponent = __decorate([
        Component({
            selector: 'app-list',
            template: "<ul>\n    <li>Jane</li>\n    <li>Nick</li>\n    <li>Mia</li>\n    <li>Peter</li>\n  </ul>"
        })
    ], ListComponent);
    return ListComponent;
}());
var GreetingModule = /** @class */ (function () {
    function GreetingModule() {
    }
    GreetingModule = __decorate([
        Module({
            declarations: [GreetingComponent, ListComponent]
        })
    ], GreetingModule);
    return GreetingModule;
}());
