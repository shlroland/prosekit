import { clsx } from 'clsx'
import { defineClientComponent } from 'vitepress'
import { useData } from 'vitepress'
import { defineComponent, h } from 'vue'

const Editor = defineClientComponent(async () => {
  const mod = (await import('./vue-full/App.vue')) as { default: unknown }
  return mod.default
})

export const DemoEditor = defineComponent(() => {
  const { isDark } = useData()

  return () =>
    h(
      'div',
      {
        class: clsx(
          'flex w-full flex-col items-center p-4',
          isDark.value ? 'dark' : null,
        ),
      },
      h('div', { class: 'max-w-full w-[600px] h-[400px]' }, h(Editor)),
    )
})
