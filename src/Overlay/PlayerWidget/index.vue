<template>
  <a-layout-footer>
    <div class="player_content">
      <div class="song_info">
        <a-avatar shape="square" :size="50" icon="smile"/>
        <div class="blocks">
          <p class="song_name">桃花庵</p>
          <p class="artists">出我我</p>
        </div>
      </div>
      <div class="controller">
        <div class="play_widget">
          <a-icon type="step-backward" style="font-size: 20px"/>
          <a-icon type="caret-right" style="font-size: 20px" class="play_style"/>
          <a-icon type="step-forward" style="font-size: 20px"/>
        </div>
        <div class="progress_bar">
          <a-progress
            :stroke-color="{'0%': '#ffcaca','100%': '#ff4e4e'}" :percent="90" :strokeWidth="3" :show-info="false"/>
        </div>
      </div>
      <div class="tool_block">

      </div>
    </div>
  </a-layout-footer>
</template>

<script>
export default {
  name: "index"
}
</script>

<style scoped lang="scss">
.player_content {
  display: flex;
  height: 54px;

  .song_info {
    width: 210px;
    display: flex;

    .blocks {
      padding: 4px;
      margin-left: 6px;

      .song_name {
        margin-bottom: 4px;
      }

      .artists {
        margin: 0;
        font-size: 13px;
      }
    }
  }

  .controller {
    width: 520px;
    text-align: center;

    .play_widget {
      .play_style {
        background: #eee;
        border-radius: 18px;
        padding: 7px;
        margin: 0 30px;
      }
    }

    .progress_bar {
      /deep/ .ant-progress-line {
        .ant-progress-outer {
          &:hover {
            .ant-progress-bg {
              height: 6px !important;
            }

            .ant-progress-inner {
              height: 6px;
            }
          }

          .ant-progress-inner {
            background: #dadada;
            margin-top: 6px;
          }
        }
      }
    }
  }
}
</style>