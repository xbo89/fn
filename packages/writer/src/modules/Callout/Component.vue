<template>
  <NodeViewWrapper class="callout">
    <MenuContainer placement="top">
      <div class="border p-3 rounded-lg flex my-2 items-start space-x-2" :style="{
        borderColor: props.node.attrs.border,
        backgroundColor:props.node.attrs.background,
        color: props.node.attrs.textColor
      }">
        <MenuContainer placement="bottom-start">
          <div
            class="callout-emoji w-7 h-7 rounded text-xl hover:bg-gray-950/10 cursor-pointer inline-flex justify-center items-center"
            contenteditable="false">
            {{ punycode.decode(props.node.attrs.emoji) }}
          </div>
          <template #floating>
            <EmojiPanel @selectEmoji="changeEmoji" />
          </template>
        </MenuContainer>
        <NodeViewContent />
      </div>
      <template #floating>
        <BubbleContainer>
          <MenuContainer :teleport="false">
            <BubbleToggleButton icon="i-ri-palette-line" hasChild />
            <template #floating>
              <MenuPopper>
                <ColorPicker @changeColor="changeColor" @changeBorder="changeBorder"
                  @changeBackground="changeBackground" @clearColor="clearColor" @clearBorder="clearBorder"
                  @clearBackground="clearBackground" />
              </MenuPopper>
            </template>
          </MenuContainer>
          <BubbleToggleButton icon="i-ri-dice-line" @mousedown="randomColor" />
        </BubbleContainer>
      </template>
    </MenuContainer>
  </NodeViewWrapper>

</template>
<script setup>
  import { computed } from 'vue'
  import punycode from 'punycode/'
  import { nodeViewProps, NodeViewWrapper, NodeViewContent } from '@tiptap/vue-3'
  import MenuContainer from '../../components/MenuContainer.vue'
  import BubbleContainer from '../../components/BubbleContainer.vue'
  import BubbleToggleButton from '../../components/BubbleToggleButton.vue'
  import EmojiPanel from '../../components/EmojiPanel.vue'
  import MenuPopper from '../../components/MenuPopper.vue'
  import ColorPicker from './ColorPicker.vue'
  import { random } from '../../utils'
  import ColorfulBlock from '../../components/ColorfulBlock'

  const props = defineProps({ ...nodeViewProps })
  const changeEmoji = (emoji) => {
    props.updateAttributes({
      emoji: punycode.encode(emoji),
    })
  }

  const randomColor = () => {
    const border = ColorfulBlock[random(0, ColorfulBlock.length - 1)].variants.light.border
    const background = ColorfulBlock[random(0, ColorfulBlock.length - 1)].variants.light.background

    props.updateAttributes({
      border,
      background,
    })
  }

  const changeColor = (color) => {
    props.updateAttributes({
      textColor: color,
    })
  }
  const clearColor = (color) => {
    props.updateAttributes({
      textColor: color,
    })
  }
  const changeBorder = (color) => {
    props.updateAttributes({
      border: color,
    })
  }
  const clearBorder = (color) => {
    props.updateAttributes({
      border: color,
    })
  }
  const changeBackground = (color) => {
    props.updateAttributes({
      background: color,
    })
  }
  const clearBackground = (color) => {
    props.updateAttributes({
      background: color,
    })
  }
  // const test = () => {
  //   // props.updateAttributes({
  //   //   border: '#ff0000',
  //   // })
  //   props.updateAttributes({
  //     border: '#ff0000',
  //     background: '#0000ff',
  //     textColor: '#00ff00',
  //     emoji: punycode.encode('🔫')
  //   })
  // }
</script>