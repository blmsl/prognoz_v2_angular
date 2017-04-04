import { PrognozAngularPage } from './app.po';

describe('prognoz-angular App', () => {
  let page: PrognozAngularPage;

  beforeEach(() => {
    page = new PrognozAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
