'use strict';

define("super-rentals/tests/acceptance/list-rentals-test", ["@ember/test-helpers", "ember-qunit", "ember-cli-mirage/test-support/setup-mirage", "qunit"], function (_testHelpers, _emberQunit, _setupMirage, _qunit) {
  "use strict";

  (0, _qunit.module)('Acceptance | list-rentals', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _setupMirage.default)(hooks);
    hooks.beforeEach(() => {
      this.rental = {
        image: 'fake.png',
        title: 'test-title',
        owner: 'test-owner',
        type: 'test-type',
        city: 'test-city',
        bedrooms: 3
      };
    });
    (0, _qunit.test)('should show rentals as the home page', async function (assert) {
      await (0, _testHelpers.visit)('/');
      assert.equal((0, _testHelpers.currentURL)(), '/rentals', 'should redirect automatticaly');
    });
    (0, _qunit.test)('should link to information about the company.', async function (assert) {
      await (0, _testHelpers.visit)('/');
      await (0, _testHelpers.click)('.menu-about');
      assert.equal((0, _testHelpers.currentURL)(), '/about', 'should navigate to about');
    });
    (0, _qunit.test)('should link to contact information.', async function (assert) {
      await (0, _testHelpers.visit)('/');
      await (0, _testHelpers.click)('.menu-contact');
      assert.equal((0, _testHelpers.currentURL)(), '/contact', 'should navigate to contact');
    });
    (0, _qunit.test)('should list available rentals.', async function (assert) {
      await (0, _testHelpers.visit)('/');
      assert.equal(this.element.querySelectorAll('.listing').length, 3, 'should display 3 listings');
    });
    (0, _qunit.test)('should filter the list of rentals by city.', async function (assert) {
      assert(true);
    });
    (0, _qunit.test)('should show details for a selected rental', async function (assert) {
      assert(true);
    });
  });
});
define("super-rentals/tests/integration/components/list-filter-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  const ITEMS = [{
    city: 'San Francisco'
  }, {
    city: 'Portland'
  }, {
    city: 'Seattle'
  }];
  const FILTERED_ITEMS = [{
    city: 'San Francisco'
  }];
  (0, _qunit.module)('Integration | Component | list-filter', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('should initially load all listings', async function (assert) {
      // we want our actions to return promises, since they are potentially
      // fetching data asynchronously.
      this.set('filterByCity', () => Promise.resolve({
        results: ITEMS
      })); // with an integration test, you can set up and use your component in the
      // same way your application will use it.

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "P9miy1YR",
        "block": "{\"symbols\":[\"results\",\"item\"],\"statements\":[[0,\"\\n      \"],[5,\"list-filter\",[],[[\"@filter\"],[[28,\"action\",[[23,0,[]],[24,[\"filterByCity\"]]],null]]],{\"statements\":[[0,\"\\n        \"],[7,\"ul\",true],[8],[0,\"\\n\"],[4,\"each\",[[23,1,[]]],null,{\"statements\":[[0,\"          \"],[7,\"li\",true],[10,\"class\",\"city\"],[8],[0,\"\\n            \"],[1,[23,2,[\"city\"]],false],[0,\"\\n          \"],[9],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"        \"],[9],[0,\"\\n      \"]],\"parameters\":[1]}],[0,\"\\n    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      await (0, _testHelpers.settled)();
      assert.equal(this.element.querySelectorAll('.city').length, 3);
      assert.dom(this.element.querySelector('.city')).hasText('San Francisco');
    });
    (0, _qunit.test)('should update with matching listings', async function (assert) {
      this.set('filterByCity', val => {
        if (val === '') {
          return Promise.resolve({
            query: val,
            results: ITEMS
          });
        } else {
          return Promise.resolve({
            query: val,
            results: FILTERED_ITEMS
          });
        }
      });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "P9miy1YR",
        "block": "{\"symbols\":[\"results\",\"item\"],\"statements\":[[0,\"\\n      \"],[5,\"list-filter\",[],[[\"@filter\"],[[28,\"action\",[[23,0,[]],[24,[\"filterByCity\"]]],null]]],{\"statements\":[[0,\"\\n        \"],[7,\"ul\",true],[8],[0,\"\\n\"],[4,\"each\",[[23,1,[]]],null,{\"statements\":[[0,\"          \"],[7,\"li\",true],[10,\"class\",\"city\"],[8],[0,\"\\n            \"],[1,[23,2,[\"city\"]],false],[0,\"\\n          \"],[9],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"        \"],[9],[0,\"\\n      \"]],\"parameters\":[1]}],[0,\"\\n    \"]],\"hasEval\":false}",
        "meta": {}
      })); // fill in the input field with 's'

      await (0, _testHelpers.fillIn)(this.element.querySelector('.list-filter input'), 's'); // keyup event to invoke an action that will cause the list to be filtered

      await (0, _testHelpers.triggerKeyEvent)(this.element.querySelector('.list-filter input'), "keyup", 83);
      await (0, _testHelpers.settled)();
      assert.equal(this.element.querySelectorAll('.city').length, 1, 'One result returned');
      assert.dom(this.element.querySelector('.city')).hasText('San Francisco');
    });
  });
});
define("super-rentals/tests/integration/components/location-map-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Component | location-map', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);
    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "z6fCboKx",
        "block": "{\"symbols\":[],\"statements\":[[5,\"location-map\",[],[[],[]]]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), ''); // Template block usage:

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "12jelpjz",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n      \"],[5,\"location-map\",[],[[],[]],{\"statements\":[[0,\"\\n        template block text\\n      \"]],\"parameters\":[]}],[0,\"\\n    \"]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define("super-rentals/tests/integration/components/rental-listing-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  // import { render } from '@ember/test-helpers';
  // import hbs from 'htmlbars-inline-precompile';
  (0, _qunit.module)('Integration | Component | rental-listing', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks); // test('it renders', async function(assert) {
    //   // Set any properties with this.set('myProperty', 'value');
    //   // Handle any actions with this.set('myAction', function(val) { ... });
    //   await render(hbs`<RentalListing />`);
    //   assert.equal(this.element.textContent.trim(), '');
    //   // Template block usage:
    //   await render(hbs`
    //     <RentalListing>
    //       template block text
    //     </RentalListing>
    //   `);
    //   assert.equal(this.element.textContent.trim(), 'template block text');
    // });
  });
});
define("super-rentals/tests/integration/helpers/rental-property-type-test", ["qunit", "ember-qunit", "@ember/test-helpers"], function (_qunit, _emberQunit, _testHelpers) {
  "use strict";

  (0, _qunit.module)('Integration | Helper | rental-property-type', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it renders', async function (assert) {
      this.set('inputValue', '1234');
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "iIlSP0oL",
        "block": "{\"symbols\":[],\"statements\":[[1,[28,\"rental-property-type\",[[24,[\"inputValue\"]]],null],false]],\"hasEval\":false}",
        "meta": {}
      }));
      assert.equal(this.element.textContent.trim(), '1234');
    });
  });
});
define("super-rentals/tests/lint/app.lint-test", [], function () {
  "use strict";

  QUnit.module('ESLint | app');
  QUnit.test('adapters/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/application.js should pass ESLint\n\n');
  });
  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });
  QUnit.test('components/list-filter.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/list-filter.js should pass ESLint\n\n');
  });
  QUnit.test('components/location-map.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/location-map.js should pass ESLint\n\n');
  });
  QUnit.test('components/rental-listing.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/rental-listing.js should pass ESLint\n\n');
  });
  QUnit.test('controllers/rentals.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/rentals.js should pass ESLint\n\n');
  });
  QUnit.test('controllers/rentals/index.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/rentals/index.js should pass ESLint\n\n');
  });
  QUnit.test('helpers/rental-property-type.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/rental-property-type.js should pass ESLint\n\n');
  });
  QUnit.test('models/rental.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/rental.js should pass ESLint\n\n');
  });
  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });
  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });
  QUnit.test('routes/about.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/about.js should pass ESLint\n\n');
  });
  QUnit.test('routes/contact.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/contact.js should pass ESLint\n\n');
  });
  QUnit.test('routes/index.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/index.js should pass ESLint\n\n');
  });
  QUnit.test('routes/rentals.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/rentals.js should pass ESLint\n\n');
  });
  QUnit.test('routes/rentals/index.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/rentals/index.js should pass ESLint\n\n');
  });
  QUnit.test('routes/rentals/show.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/rentals/show.js should pass ESLint\n\n');
  });
  QUnit.test('services/map-element.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/map-element.js should pass ESLint\n\n');
  });
});
define("super-rentals/tests/lint/templates.template.lint-test", [], function () {
  "use strict";

  QUnit.module('TemplateLint');
  QUnit.test('super-rentals/templates/about.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'super-rentals/templates/about.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('super-rentals/templates/application.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'super-rentals/templates/application.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('super-rentals/templates/components/list-filter.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'super-rentals/templates/components/list-filter.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('super-rentals/templates/components/location-map.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'super-rentals/templates/components/location-map.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('super-rentals/templates/components/rental-listing.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'super-rentals/templates/components/rental-listing.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('super-rentals/templates/contact.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'super-rentals/templates/contact.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('super-rentals/templates/index.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'super-rentals/templates/index.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('super-rentals/templates/rentals.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'super-rentals/templates/rentals.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('super-rentals/templates/rentals/index.hbs', function (assert) {
    assert.expect(1);
    assert.ok(false, 'super-rentals/templates/rentals/index.hbs should pass TemplateLint.\n\nsuper-rentals/templates/rentals/index.hbs\n  2:4  error  Incorrect indentation for `<ul>` beginning at L2:C4. Expected `<ul>` to be at an indentation of 2 but was found at 4.  block-indentation\n  3:8  error  Incorrect indentation for `{{#each}}` beginning at L3:C8. Expected `{{#each}}` to be at an indentation of 6 but was found at 8.  block-indentation\n  4:8  error  Incorrect indentation for `<li>` beginning at L4:C8. Expected `<li>` to be at an indentation of 10 but was found at 8.  block-indentation\n  5:12  error  Incorrect indentation for `<RentalListing>` beginning at L5:C12. Expected `<RentalListing>` to be at an indentation of 10 but was found at 12.  block-indentation\n');
  });
  QUnit.test('super-rentals/templates/rentals/show.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, 'super-rentals/templates/rentals/show.hbs should pass TemplateLint.\n\n');
  });
});
define("super-rentals/tests/lint/tests.lint-test", [], function () {
  "use strict";

  QUnit.module('ESLint | tests');
  QUnit.test('acceptance/list-rentals-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/list-rentals-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/list-filter-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/list-filter-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/location-map-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/location-map-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/components/rental-listing-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/rental-listing-test.js should pass ESLint\n\n');
  });
  QUnit.test('integration/helpers/rental-property-type-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/rental-property-type-test.js should pass ESLint\n\n');
  });
  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });
  QUnit.test('unit/adapters/application-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/adapters/application-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/controllers/rentals-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/rentals-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/controllers/rentals/index-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/rentals/index-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/models/rental-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/rental-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/routes/about-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/about-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/routes/contact-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/contact-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/routes/index-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/index-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/routes/rentals-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/rentals-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/routes/rentals/index-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/rentals/index-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/routes/rentals/show-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/rentals/show-test.js should pass ESLint\n\n');
  });
  QUnit.test('unit/services/map-element-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/map-element-test.js should pass ESLint\n\n');
  });
});
define("super-rentals/tests/test-helper", ["super-rentals/app", "super-rentals/config/environment", "@ember/test-helpers", "ember-qunit"], function (_app, _environment, _testHelpers, _emberQunit) {
  "use strict";

  (0, _testHelpers.setApplication)(_app.default.create(_environment.default.APP));
  (0, _emberQunit.start)();
});
define("super-rentals/tests/unit/adapters/application-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Adapter | application', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let adapter = this.owner.lookup('adapter:application');
      assert.ok(adapter);
    });
  });
});
define("super-rentals/tests/unit/controllers/rentals-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Controller | rentals', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:rentals');
      assert.ok(controller);
    });
  });
});
define("super-rentals/tests/unit/controllers/rentals/index-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Controller | rentals/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:rentals/index');
      assert.ok(controller);
    });
  });
});
define("super-rentals/tests/unit/models/rental-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Model | rental', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let store = this.owner.lookup('service:store');
      let model = store.createRecord('rental', {});
      assert.ok(model);
    });
  });
});
define("super-rentals/tests/unit/routes/about-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | about', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:about');
      assert.ok(route);
    });
  });
});
define("super-rentals/tests/unit/routes/contact-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | contact', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:contact');
      assert.ok(route);
    });
  });
});
define("super-rentals/tests/unit/routes/index-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:index');
      assert.ok(route);
    });
  });
});
define("super-rentals/tests/unit/routes/rentals-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | rentals', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:rentals');
      assert.ok(route);
    });
  });
});
define("super-rentals/tests/unit/routes/rentals/index-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | rentals/index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:rentals/index');
      assert.ok(route);
    });
  });
});
define("super-rentals/tests/unit/routes/rentals/show-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Route | rentals/show', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);
    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:rentals/show');
      assert.ok(route);
    });
  });
});
define("super-rentals/tests/unit/services/map-element-test", ["qunit", "ember-qunit"], function (_qunit, _emberQunit) {
  "use strict";

  (0, _qunit.module)('Unit | Service | map-element', function (hooks) {
    (0, _emberQunit.setupTest)(hooks); // Replace this with your real tests.

    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:map-element');
      assert.ok(service);
    });
  });
});
define('super-rentals/config/environment', [], function() {
  var prefix = 'super-rentals';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(decodeURIComponent(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

require('super-rentals/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
