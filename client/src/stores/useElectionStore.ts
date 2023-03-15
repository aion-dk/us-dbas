import { defineStore } from 'pinia'
import { ref } from "vue"
import api from "../lib/api"

export default defineStore('useElectionStore', () => {
  const election = ref({})

  const setElection = (newElection) => {
    election.value = newElection
  }

  const loadElection = async (slug: string) => {
    const { data } = await api.get(`${slug}/configuration/latest_config`)
    setElection({
      ...data.items.electionConfig,
      slug: slug,
    })
  }

  return { election, setElection, loadElection }
})
