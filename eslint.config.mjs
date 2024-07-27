import antfu from '@antfu/eslint-config'

export default antfu({
  vue:{},
  rules: {
    'vue/block-order': ['error', {
      order: [['template', 'script'], 'style'],
    }],
  },
})
