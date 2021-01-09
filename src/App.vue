<template>
  <div class="master">
    <div class="header">
      <div class="header-title">Cat Facts Bookmark</div>
    </div>
    <div class="content">
      <CatFacts :options="{count: $options.COUNT_FACTS}" />
    </div>
    <div class="footer">
      <div class="footer-autor">
        @{{year}} Constantin Polozin
      </div>
    </div>
  </div>
</template>

<script>
import CatFacts from './components/CatFacts';

export default {
  name: 'App',
  COUNT_FACTS: 10,
  components: {
    CatFacts,
  },
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=B612&display=swap');

html, body {
  padding: 0;
  margin: 0;
  height: 100%;
  min-height: 100%;
}
body {
  font-family: 'B612', sans-serif;
  font-size: 14px;
  color: #000;
}
.master {
  height: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
}
.content{
  flex-grow: 1;
}
.header {
  color: #5c7f51;
  padding: 20px ;
  border: solid 1px #777777;
}
.header-title{
  font-size: 30px;
  font-weight: 600;
}
.footer {
  padding: 20px 0;
}
.footer-autor{
  color: #5c7f51;
  text-align: center;
}
</style>
