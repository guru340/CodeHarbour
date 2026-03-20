import React, { useEffect, useState } from 'react'
import IssueList from '@/Project/IssueList'
import ChatBox from '@/Project/ChatBox'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import InviteUserForm from '@/Project/InviteUserForm'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProjectById } from '@/Redux/Project/Action'
import { fetchIssues } from '@/Redux/Issue/Action'
import { loadCacheForProject } from '@/Redux/Issue/Reducer'

const ProjectDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  const { ProjectDetails, loading } = useSelector((store) => store.project)
  const { issues: reduxIssues, currentProjectId } = useSelector((store) => store.issue)

  // ✅ Control invite dialog open/close
  const [inviteOpen, setInviteOpen] = useState(false)

  const isSameProject = String(currentProjectId) === String(id)
  const issues = isSameProject ? reduxIssues : loadCacheForProject(id)

  useEffect(() => {
    if (!id) return
    if (!ProjectDetails || String(ProjectDetails.id) !== String(id)) {
      dispatch(fetchProjectById(id))
    }
    dispatch(fetchIssues(id))
  }, [id])

  if (loading && !ProjectDetails) {
    return (
      <div className="min-h-screen bg-[#0e0f1f] flex items-center justify-center">
        <p className="text-gray-500 text-sm">Loading project...</p>
      </div>
    )
  }

  const team = ProjectDetails?.team || []
  const normalize = (s) => String(s || "").toUpperCase().replace("-", "_")
  const issueArray = Array.isArray(issues) ? issues : []

  const pendingIssues    = issueArray.filter(i => normalize(i.status) === "PENDING")
  const inProgressIssues = issueArray.filter(i => normalize(i.status) === "IN_PROGRESS")
  const doneIssues       = issueArray.filter(i => normalize(i.status) === "DONE")

  return (
    <div className='min-h-screen bg-[#0e0f1f] text-white mt-5 lg:px-10 px-5'>
      <div className='lg:flex gap-5'>

        <div className='flex-1'>
          <ScrollArea className="h-screen pr-2">

            <div className='pb-6 border-b border-[#252a45]'>
              <h1 className='text-2xl font-bold text-white'>
                {ProjectDetails?.name || "Project Name"}
              </h1>
              {ProjectDetails?.tags?.length > 0 && (
                <div className="flex gap-2 flex-wrap mt-3">
                  {ProjectDetails.tags.map((tag, i) => (
                    <span key={i} className="text-xs px-3 py-1 rounded-full border border-[#2e3460] text-gray-400">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className='py-6 space-y-4 border-b border-[#252a45]'>
              <div className='flex items-center gap-4'>
                <span className='text-gray-400 w-28'>Project Lead :</span>
                <span className='text-white'>{ProjectDetails?.owner?.fullName || "-"}</span>
              </div>

              <div className='flex items-center gap-4'>
                <span className='text-gray-400 w-28'>Members :</span>
                <div className='flex items-center gap-2 flex-wrap'>
                  {team.map((member, i) => (
                    <div key={i}
                      className='w-8 h-8 rounded-full bg-[#1e2340] border border-[#252a45] flex items-center justify-center text-sm font-semibold text-white'
                      title={member?.fullName}
                    >
                      {member?.fullName?.charAt(0).toUpperCase() || "?"}
                    </div>
                  ))}

                  {/* ✅ Controlled dialog — closes after invite sent */}
                  <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant='outline'
                        size='sm'
                        className='h-8 px-3 text-xs border-[#252a45] bg-[#131525] text-gray-300 hover:bg-[#1e2340] hover:text-white'
                      >
                        invite +
                      </Button>
                    </DialogTrigger>
                    <DialogContent className='bg-[#131525] border border-[#252a45] text-white'>
                      <DialogHeader className='text-lg font-semibold'>Invite User</DialogHeader>
                      {/* ✅ onClose closes the dialog after success */}
                      <InviteUserForm onClose={() => setInviteOpen(false)} />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <div className='flex items-center gap-4'>
                <span className='text-gray-400 w-28'>Category :</span>
                <span className='text-white'>{ProjectDetails?.category || "-"}</span>
              </div>

              <div className='flex items-center gap-4'>
                <span className='text-gray-400 w-28'>Description :</span>
                <span className='text-white'>{ProjectDetails?.description || "-"}</span>
              </div>
            </div>

            <section>
              <p className='py-5 border-b text-lg tracking-wider text-white'>Tasks</p>
              <div className='lg:flex md:flex gap-3 justify-between py-5'>
                <IssueList status="PENDING"     title="Todo List"   projectId={id} issues={pendingIssues} />
                <IssueList status="IN_PROGRESS" title="In Progress" projectId={id} issues={inProgressIssues} />
                <IssueList status="DONE"        title="Done"        projectId={id} issues={doneIssues} />
              </div>
            </section>

          </ScrollArea>
        </div>

        <div className='lg:w-[320px] w-full mt-5 lg:mt-0'>
          <ChatBox />
        </div>

      </div>
    </div>
  )
}

export default ProjectDetail