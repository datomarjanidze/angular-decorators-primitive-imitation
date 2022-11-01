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

interface AfterViewInit {
  afterViewInit(): void
}
interface AfterViewChecked {
  afterViewChecked(): void
}
interface IComponentMetadata {
  selector: string
  template: string
}
type Constructor<T> = new (...args: any[]) => T
type ComponentName = string

const componentRegistry: { [constructorName: string]: IComponentMetadata } = {}

function Component(metadata: IComponentMetadata) {
  return function (constructor: Function): void {
    componentRegistry[constructor.name] = metadata
    window.document
      .querySelectorAll(metadata.selector)
      .forEach(
        (element: HTMLElement) => (element.innerHTML = metadata.template)
      )
    constructor.prototype?.afterViewInit()
  }
}

function Input() {
  return function (target: any, propertyKey: string) {
    /**
     * `setTimeout`ing to get the value of `componentRegistry`. Probably
     * not a clean solution
     */
    setTimeout(() => {
      window.document
        .querySelectorAll(componentRegistry[target.constructor.name].selector)
        .forEach((element) => {
          target[propertyKey] = element.getAttribute(propertyKey)
        })
      target?.afterViewChecked()
    })
  }
}

function Module(metadata: { declarations: Constructor<any>[] }) {
  return function (constructor: Function): void {
    metadata.declarations.forEach((declaration) => new declaration())
  }
}

@Component({
  selector: 'app-greeting',
  template: '<p>Hi</p>'
})
class GreetingComponent implements AfterViewInit, AfterViewChecked {
  @Input() foo: any

  afterViewInit(): void {
    console.log('GreetingComponent.afterViewInit called')
  }

  afterViewChecked(): void {
    console.log('GreetingComponent.afterViewChecked', 'this.foo:', this.foo)
  }
}

@Component({
  selector: 'app-list',
  template: `<ul>
    <li>Jane</li>
    <li>Nick</li>
    <li>Mia</li>
    <li>Peter</li>
  </ul>`
})
class ListComponent implements AfterViewInit, AfterViewChecked {
  @Input() bar: any

  afterViewInit(): void {
    console.log('ListComponent.afterViewInit called')
  }

  afterViewChecked(): void {
    console.log('ListComponent.afterViewChecked', 'this.bar:', this.bar)
  }
}

@Module({
  declarations: [GreetingComponent, ListComponent]
})
class GreetingModule {}
