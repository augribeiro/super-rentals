import { currentURL, visit, click } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import { module, test } from 'qunit';

module('Acceptance | list-rentals', function (hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

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

  test('should show rentals as the home page', async function (assert) {
    await visit('/')
    assert.equal(currentURL(), '/rentals', 'should redirect automatticaly')
  });

  test('should link to information about the company.', async function (assert) {
    await visit('/');
    await click('.menu-about');
    assert.equal(currentURL(), '/about', 'should navigate to about');
  });

  test('should link to contact information.', async function (assert) {
    await visit('/');
    await click('.menu-contact');
    assert.equal(currentURL(), '/contact', 'should navigate to contact')
  });

  test('should list available rentals.', async function (assert) {
    await visit('/');
    assert.equal(this.element.querySelectorAll('.listing').length, 3, 'should display 3 listings');
  });

  test('should filter the list of rentals by city.', async function (assert) {
    assert(true);
  });

  test('should show details for a selected rental', async function (assert) {

    assert(true);
  });

});