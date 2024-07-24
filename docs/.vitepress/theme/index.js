// https://vitepress.dev/guide/custom-theme
import {h, toRefs} from 'vue'
import DefaultTheme from 'vitepress/theme'
import {useData, useRoute} from 'vitepress'
import giscusTalk from 'vitepress-plugin-comment-with-giscus'

import './style.css'

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({app, router, siteData}) {
    // ...
  },
  setup() {
    const {frontmatter} = toRefs(useData());
    const route = useRoute();

    giscusTalk({
          repo: 'mcdd0506/DocsTemplate',
          repoId: 'R_kgDOMaak1Q',
          category: 'Announcements',
          categoryId: 'DIC_kwDOMaak1c4ChH6X',
          mapping: 'pathname',
          inputPosition: 'top',
          lang: 'zh-CN',
          theme: 'preferred_color_scheme',
          // ...
        }, {
          frontmatter, route
        },
        true
    );
  },
}
