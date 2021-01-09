<template>
  <div class="content">
    <div class="left-side">
      <div class="main-title">
        Facts List
      </div>
      <div class="block-list">
        <transition-group name="list" tag="p">
          <div class="fact-line" v-for="(fact, index) in listFacts" :key="fact.key"
               @dblclick="showDetails(index)">
            - Fact {{ index + 1 }}
          </div>
        </transition-group>

      </div>
    </div>
    <div class="right-side">
      <div class="main-title">
        Details Panel
      </div>
      <div class="block-list">
        <div class="box-scroll">
          <div v-if="listDetails.length">
            <transition-group name="list" tag="p">
              <div class="details-line" v-for="(fact, index) in listDetails" :key="fact.key">
                <div @dblclick="hideDetails(index)" class="text"
                     title="Double click to remove from details">"{{ fact.text }}"
                </div>
                <div class="name">{{ fullName(fact) }}</div>
                <div class="rating">Rating {{ fact.rating }}</div>
              </div>
            </transition-group>
          </div>
          <div v-else>
            <div class="details-line">
              <div class="text">" &lt;-- Double click to cat fact for see details"</div>
            </div>

          </div>
        </div>
        <div class="details-footer">
          <button type="button" class="btn" @click="save" >Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Facts from "@/models/Facts";

export default {
  name: "CatFacts",
  props: {
    options: {
      type: Object, default: () => {
        return {count: 20}
      }
    }
  },
  data: () => {
    return {
      listFacts: [],
      factsModel: undefined,
      listDetails: [],
      indexer: 0
    }
  },
  created() {
    this.factsModel = new Facts(this.options.count);
    this.loadFacts();
  },
  methods: {
    fullName(fact) {
      if (fact.user && fact.user.name) {
        return fact.user.name.first + ' ' + fact.user.name.last
      }
      return 'Unknown user';
    },
    async save(){
     await this.factsModel.save(this.listDetails);
     await this.loadFacts();
    },
    hideDetails(index) {
      let [fact] = this.listDetails.splice(index, 1);
      this.listFacts.push(fact);
    },
    async showDetails(index) {
      let [fact] = this.listFacts.splice(index, 1);
      const factDetails = await this.factsModel.fetchRandomFacts(fact._id);
      if (factDetails) {
        console.log(factDetails);
        factDetails.key = this.indexer++;
        factDetails.rating = factDetails.rating || 0
        this.listDetails.push(factDetails);
      }

    },
    async loadFacts() {
      let [randomFacts, localSavedFacts] = await Promise.all([this.factsModel.fetchRandomFacts(), this.factsModel.fetchLocal()]);
      if (Array.isArray(randomFacts)) {
        for (let obj of randomFacts) {
          obj.key = this.indexer++;
        }
        this.listFacts = [...randomFacts];
      }
      if (Array.isArray(localSavedFacts)) {
        for (let obj of localSavedFacts) {
          obj.key = this.indexer++;
        }
        this.listDetails = [...localSavedFacts];
      }
    }
  }

}
</script>
<style scoped>
.list-item {
  display: inline-block;
  margin-right: 10px;
}

.list-enter-active, .list-leave-active {
  transition: all 0.6s;
}

.list-enter, .list-leave-to /* .list-leave-active до версии 2.1.8 */
{
  opacity: 0;
  transform: translateX(30px);
}

.content {
  display: flex;
  flex-direction: row;
  height: 100%;
  min-height: 100%;
  padding: 0 20px;
}

.left-side, .right-side {
  display: flex;
  flex-direction: column;
}

.left-side {
  width: 12%;
  margin-right: 1.5%;
}

.right-side {
  flex-grow: 1;
}

.main-title {
  font-size: 22px;
  color: #777;
  padding-top: 10px;
}

.block-list {
  flex-grow: 1;
  border: #777 solid 1px;
  border-radius: 3px;
  margin: 10px 0;
  padding: 10px 10px;
}

.fact-line {
  font-size: 20px;
  margin: 10px;
  cursor: pointer;
}
.box-scroll {
  height: 70vh;
  overflow-y: auto;
  overflow-x: hidden;
}

.details-line {
  border: solid 1px #777;
  border-radius: 3px;
  padding: 10px;
  margin-bottom: 10px;
}

.name, .rating {
  color: #a0a0aa;
  margin-top: 4px;
}

.text {
  font-size: 16px;
  cursor: pointer;
}
.details-footer{
  display: flex;
  flex-direction: row-reverse;
  padding-top: 10px;
}
.btn{
  outline: none;
  color: #fff;
  background-color: #62a0ff;
  border: solid 1px #777;
  border-radius: 10px;
  padding: 0 24px;
  font-size: 16px;
  cursor: pointer;
}
</style>