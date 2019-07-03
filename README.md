# Примеры заданий для Angular

## Задание 1 (динамические вкладки)

<details>
<summary>Описание решения</summary>
<div>
 <br /> <br />
Взять шаблон приложения (https://stackblitz.com/github/BaryshevRS/tasks-angular/tree/custom-tab) и на его основе реализовать табы по указанной в `app.component.html` разметке (в отдельном модуле, в отдельном каталоге). И содержимое, и заголовок должны поддерживать отображение других компонентов/произвольного html. 

По умолчанию активен первый таб. Должна поддерживаться возможность динамически добавить/убрать таб. При удалении активного таба, активным становится первый таб (если остался хотя бы один). Для оформления табов достаточно использовать 3 класса из `styles.css`. Приложение должно работать без `NO_ERRORS_SCHEMA/CUSTOM_ELEMENTS_SCHEMA` в `AppModule`.

**Bonus:** Сделать так, чтобы содержимое табов инициализировалось только при активации таба. Допускается изменение разметки.
 
</div>
</details>

## Решение

<details>
<summary>Основное задание</summary>
<div>
<br /> <br />
 
 **Пояснение к исходникам. Описание порядка действий**.

1. Для начала создадим отсутствующие компоненты `tab`, `tab-title`, `tab-content` и поместим их в отдельный модуль.
Это сразу решает проблему с выводом ошибок и можно отключить их блокировку через `NO_ERRORS_SCHEMA`.

2. Теперь передадим в шаблон компонентов директиву `ng-content`.

Директива выводит в шаблоне то, что находится между тегами компонента. Это как раз и требуется в нашем случае.

3. По представленной структуре у нас нет входных параметров для вложенных компонентов, 
поэтому нам понадобится создать шаред-сервис.

Он нами будет использоваться, как синглтон, принадлежащий компоненту `tabs`, поэтому там и зарегистрируем этот провайдер.
Если зарегистрировать в модуле, этот класс будет общий для всех компонентов табов, а нам это не нужно.

Сервис будет хранить текущий индекс и `EventEmitter` для уведомления компонентов, какой таб активен.

4. Так как дочерние табы не знают какой они имеют индекс, мы его проставим самостоятельно. 
Для этого, используя наш синглтон класс, в компоненте `tab` проставим `tabIndex` для каждого компонента простым инкрементированием, 
который будет вызываться при создании компонента.

И передадим его непосредственно дочерним компонентам. Получить доступ к ним можно через декоратор `@ContentChild`.
Декоратор `@ContentChild` получает доступ к контенту, который располагается внутри его тегов.

```
  @ContentChild(TabTitleComponent) tabTitleComponent: TabTitleComponent;
  @ContentChild(TabContentComponent) tabContentComponent: TabContentComponent;
 
  ngAfterContentInit() {

    // set tab index for child component
    this.tabTitleComponent.tabIndex = this.tabIndex;
    this.tabContentComponent.tabIndex = this.tabIndex;

    if (!this.tabTitleComponent.activeTab) {
      this.tabsService.setTabIndex();
    }

  }
```  

На хук `ngAfterContentInit` (после инициализации вложенной части компонента) передаём индекс в `tab-title`, `tab-content` 
и заодно устанавливаем активный таб по умолчанию.

5. Зная индекс теперь добавим в `tab-title` событие обработки клика с помощью декоратора @HostListener (прослушивает события на компоненте).

```
  @HostListener('click') initTab() {
    this.tabsService.setTabIndex(this.tabIndex); // set active tab
  }
```
 
С помощью декоратора `@HostBinding` установим привязку активного класса.

```
  @HostBinding('class') activeTab = '';
```

Когда будет клик по компоненту, будет установлен класс.

```
  ngAfterContentInit() {
    this.subscription = this.tabsService.change.subscribe(tabIndex => {
      this.activeTab = tabIndex === this.tabIndex ? classActiveTab : '';
    });
  }
```

Тут суть в том, что по клику событие эмитится в сервис, который оповещает все подписанные компоненты об изменившимся активном табе.

И в хуке `ngAfterContentInit` мы делаем проверку, совпадает ли индекс или нет. 

6. Всё аналогично и в `tab-content`. Также подписываемся на сервис, а для скрытия компонента связываем свойство `hidden`, 
которое будет управлять видимостью компонента, в зависимости от активного класса. 

```
  @HostBinding('hidden') hidden = true;
```

Просмотр решения: 
https://stackblitz.com/github/BaryshevRS/tasks-angular/tree/custom-tab-answer

</details>

<details>
<summary>Бонусное задание</summary>
<div>
 <br /> <br />
 
**Пояснение к исходникам. Описание порядка действий**.

1. В реализации основной части у нас при загрузке отображался весь контент, но и скрыть его через `ngIf` не получится, 
так как `ng-content` это всего лишь проекция и вызывается раньше места расположения `ng-content`.

Хук `ngAfterContentInit()` срабатывает раньше чем отработает шаблон `ngAfterViewInit()`.

2. Так как по условию разрешается менять структуру, то мы просто обернём контентную часть `tab-content` в
директиву `ng-template` (хранит шаблон вне отображения).

```
    <tab-content>
      <ng-template>
        Tab <b>{{ tab }}</b> content
        <test [tab]="tab"></test>
      </ng-template>
    </tab-content> 
```

3. Теперь контент не выводится вообще, но это можно решить с помощью специальной директивы `ngTemplateOutlet` 
(выводит шаблон по переданной ссылке).

```
<ng-template [ngTemplateOutlet]="templateRef"></ng-template>
```

И в компоненте создаём такую ссылку на шаблон.

```
@ContentChild(TemplateRef) templateRef: TemplateRef<any>;
```

4. Теперь мы можем поставить условие через `*ngIf` и всё будет работать.

```
<ng-container *ngIf="!hidden">
  <ng-template [ngTemplateOutlet]="templateRef"></ng-template>
</ng-container>
```

Просмотр решения: 
https://stackblitz.com/github/BaryshevRS/tasks-angular/tree/custom-tab-bonus-answer

</details>

## Задание 2 (директива ifViewportSize)

<details>
<summary>Описание задачи</summary>
<div>
 <br /> <br />
  Форкнуть шаблон приложения 
  (https://stackblitz.com/github/BaryshevRS/tasks-angular/tree/if-viewport-size) 
  и на его основе реализовать:
  
  - модуль в отдельном каталоге, содержащий структурную директиву `ifViewportSize`, которая рендерит элемент, если ширина окна браузера соответствует переданному значения. Ширина браузера может изменяться после запуска приложения.
  - сервис в том же модуле, который занимается определением текущей ширины окна браузера и должен получать на этапе инициализации конфиг с пороговыми значениями для разных типов ширины (нижнее значение, с которого начинается соответствующий тип)
  - конфиг для сервиса должен передаваться через `AppModule`
  
  Для тестирования раскомментировать разметку в `app.component.html`.
  
  **Обратить внимание на производительность** (на странице могут быть сотни произвольных компонентов)
  
  ```
  interface IConfig {
    medium: number;
    large: number;
  }
  ```
  
  ```
  small: viewportWidth < config.medium
  medium: config.medium <= viewportWidth < config.large
  large: config.large <= viewportWidth
  ```
 
</div>
</details>


## Решение

<details>
<summary>Описание решения</summary>
<div>
 <br /> <br />
 
1. Создадим структурную директиву `IfViewportSizeDirective`, в которую заинжектим ссылку на шаблон `TemplateRef` и на контейнер шаблона `ViewContainerRef`. 

Теперь мы может управлять отрисовкой компонента, к которому применена директива.

```
    if (initShow) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
```

Поведение аналогично тому, как работает стандартный `*ngIf`.

2. Для определения, когда отрисовывать компонент, а когда нет - заведём сервис, который будет определять разрешение экрана.

```
  setViewport(viewportType): boolean {
    const viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

    let show = false;

    switch (viewportType) {
      case ViewportConfigSize.SMALL:
        show = viewportWidth < this.viewportConfig.medium;
        break;
      case ViewportConfigSize.MEDIUM:
        show = this.viewportConfig.medium <= viewportWidth && viewportWidth < this.viewportConfig.large;
        break;
      case ViewportConfigSize.LARGE:
        show = viewportWidth >= this.viewportConfig.large;
        break;
    }

    return show;
  }
```

Для отслеживания изменения разрешения напишем следующий код:

```
  checkViewport(viewportType): Observable<any> {
    return fromEvent(window, 'resize')
      .pipe(
        debounceTime(200),
        distinct(),
        map(() => this.setViewport(viewportType))
      );
  }
```

Тут мы решаем вопрос производительности, отсеивая лишние и повторные запросы с помощью оператора `debounceTime(200)` и `distinct()`.

3. Теперь нам надо задавать конфигурацию в `AppModule`. 
Для этого создадим модуль `ViewportSizeModule`.

```
@NgModule({
  declarations: [IfViewportSizeDirective],
  imports: [
    CommonModule
  ],
  exports: [
    IfViewportSizeDirective
  ]
})
export class ViewportSizeModule {
  static forRoot(config: IConfig): ModuleWithProviders {
    return {
      ngModule: ViewportSizeModule,
      providers: [{
        provide: ViewportSizeService, useFactory() {
          return new ViewportSizeService(config);
        }
      }]
    };
  }
}
```

Тут нашему сервису надо принимать параметры, поэтому сделаем его через провайдер фабрику `useFactory` и передадим параметры, который принимает наш модуль в методе `forRoot`.

```
    ViewportSizeModule.forRoot({
      medium: 320,
      large: 480
    })
```

Кроме того, за счёт использования статического метода `forRoot` мы делаем наш провайдер единственным для всего приложения. Независимо будет ли этот модуль `ViewportSizeModule` дополнительно импортирован в другие модули.
 
Просмотр решения: 
https://stackblitz.com/github/BaryshevRS/tasks-angular/tree/custom-tab-bonus-answer
</div>
</details>

## Задание 3 (UI Task Tracker)

<details>
<summary>Описание задачи</summary>
<div>
<br /> <br />

**Допускается использовать:** Библиотеки компонентов или CSS фреймворки (Ant Design, Material UI,
Twitter Bootstrap и др.), a также любые JS-библиотеки, но в адекватном количестве.

**Описание:** Приложение должно представлять собой Single Page Application и быть ui-частью клиент-
серверного приложения. Данные должны храниться в формате `JSON` и должны быть легко заменимы на
соответствующие AJAX-запросы (`REST API`).

Вся конфигурация для приложения должна быть вынесена отдельно, легко редактируема.

Для тестирования работы приложения должно быть создано несколько учетных записей.

Внешний вид приложения определяется разработчиком по его желанию, верстка произвольна,
необходимо ее корректное отображение в основных современных браузерах.

Плюсом будет использование инструментов сборки.

***Основные требования:***

1. Вход в приложение, авторизация

Приложение должно содержать два уровня доступа. Неавторизованному пользователю должна быть
доступна только страница ввода данных (логин, пароль). После аутентификации пользователь получает
доступ к своему списку задач.

2. Список задач

Список задач пользователя, представленный в табличном виде, с возможностью сортировки списка,
фильтрации (к примеру - по статусам) и смены представления (подробный/краткий вид/scrum доска).
Автообновление списка каждые n минут.

3. Страница задачи

Страница с подробной информацией о задаче - название, описание, дата, приоритет, планируемое и
затраченное время, статус выполнения.

**Желательные требования (реализация будет плюсом):**

4. Изменение задачи

Возможность сменить планируемое время на выполнение задачи и ее статус, а также время, затраченное
на выполнение.

5. Добавление задачи

Возможность добавить новую задачу.

6. Scrum доска

Таблица, представленная в виде трех колонок - План, В процессе, Готово. Задачи должны быть
распределены в таблице в соответствии с их статусами и приоритетами.
Перемещение задач в таблице с помощью механизма `drag&drop`, переход между столбцами должен
сопровождаться сменой статуса у соответствующей задачи.
</div>
</details>

## Решение

<details>
<summary>Описание решения</summary>
<div>
<br /> <br />
 
Для реализации были использованы компоненты `Angular Material`, менеджер состояния `NgRx` и облачная реалтайм база `Cloud Firestore`.

Использование `json` не так интересно, кроме того, за счёт использования базы работающей в реальном времени, решается задача обновления контента каждые несколько минут. 
Информация в данном случае будет обновляться у всех пользователей сразу на каждое произведённое изменение.

Авторизация сделана на базе сервиса аутентификации `Firebase`.

Для создания `Scrum` доски использован `SDK` компонент из `Angular Material`.

Сделаны механизмы добавления, редактирования задач, фильтрация по приоритету. Два режима отображения: табличный и `scrum`. 
А также вынесены настройки редактирования статусов и приоритетов задач.
 
Ссылка на проект: https://github-angular-apps.web.app

Доступ в админку в общий доступ не выложен, так как ресурсы `Firebase` ограничены и нет возможности модерирования изменений.
Кому интересно - предоставлю по запросу.
</div>
</details>
