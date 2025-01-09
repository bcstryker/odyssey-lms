export default function ManagementPanel({role}: {role: string}) {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Management Panel</h3>
      {role === "instructor" && (
        <div>
          <p>Instructor Tools:</p>
          <ul className="list-disc ml-6">
            <li>Manage Assignments</li>
            <li>Grade Submissions</li>
            <li>View Course Analytics</li>
          </ul>
        </div>
      )}
      {role === "admin" && (
        <div>
          <p>Admin Tools:</p>
          <ul className="list-disc ml-6">
            <li>Manage Users</li>
            <li>Manage Courses</li>
            <li>Access System Settings</li>
          </ul>
        </div>
      )}
    </div>
  );
}
