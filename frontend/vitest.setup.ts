// vitest.setup.ts
import { vi } from 'vitest'
import { config } from '@vue/test-utils'
import { defineComponent, h } from 'vue'

// Mock global extremamente detalhado
vi.mock('nuxt/app', () => {
  const MockNuxtLink = defineComponent({
    name: 'NuxtLink',
    props: {
      to: {
        type: [String, Object],
        required: true
      }
    },
    render() {
      return h('a', { href: this.to }, this.$slots.default?.())
    }
  })

  return {
    useNuxtApp: vi.fn(() => ({
      vueApp: {
        component: vi.fn()
      }
    })),
    defineNuxtComponent: vi.fn((options) => options),
    useRoute: vi.fn(() => ({
      path: '/',
      name: 'mock-route',
      params: {},
      query: {}
    })),
    useRouter: vi.fn(() => ({
      push: vi.fn(),
      replace: vi.fn()
    })),
    NuxtLink: MockNuxtLink,
    // Mock específico para resolver o erro de componentName
    defineNuxtLink: () => MockNuxtLink
  }
})

// Mocks adicionais para imports problemáticos
vi.mock('#build/nuxt.config.mjs', () => ({
  default: {}
}))

vi.mock('#internal/nuxt/paths', () => ({
  default: {
    resolvePath: vi.fn((path) => path)
  }
}))

// Stubs para componentes
config.global.stubs = {
  NuxtLink: true,
  NuxtLayout: true,
  'maz-select': true,
  'maz-table': true,
  'maz-btn': true
}