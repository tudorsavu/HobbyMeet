using Microsoft.EntityFrameworkCore.Migrations;

namespace HobbyMeetAPI.Migrations
{
    public partial class SecondaryCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserHobbies_Hobbies_HobbyId",
                table: "UserHobbies");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserHobbies",
                table: "UserHobbies");

            migrationBuilder.DropIndex(
                name: "IX_UserHobbies_HobbyId",
                table: "UserHobbies");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Hobbies",
                table: "Hobbies");

            migrationBuilder.DropColumn(
                name: "HobbyId",
                table: "UserHobbies");

            migrationBuilder.DropColumn(
                name: "HobbyId",
                table: "Hobbies");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "UserHobbies",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "HobbyName",
                table: "UserHobbies",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Hobbies",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserHobbies",
                table: "UserHobbies",
                columns: new[] { "UserId", "Name" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Hobbies",
                table: "Hobbies",
                column: "Name");

            migrationBuilder.CreateIndex(
                name: "IX_UserHobbies_HobbyName",
                table: "UserHobbies",
                column: "HobbyName");

            migrationBuilder.AddForeignKey(
                name: "FK_UserHobbies_Hobbies_HobbyName",
                table: "UserHobbies",
                column: "HobbyName",
                principalTable: "Hobbies",
                principalColumn: "Name",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserHobbies_Hobbies_HobbyName",
                table: "UserHobbies");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserHobbies",
                table: "UserHobbies");

            migrationBuilder.DropIndex(
                name: "IX_UserHobbies_HobbyName",
                table: "UserHobbies");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Hobbies",
                table: "Hobbies");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "UserHobbies");

            migrationBuilder.DropColumn(
                name: "HobbyName",
                table: "UserHobbies");

            migrationBuilder.AddColumn<int>(
                name: "HobbyId",
                table: "UserHobbies",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Hobbies",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AddColumn<int>(
                name: "HobbyId",
                table: "Hobbies",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserHobbies",
                table: "UserHobbies",
                columns: new[] { "UserId", "HobbyId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Hobbies",
                table: "Hobbies",
                column: "HobbyId");

            migrationBuilder.CreateIndex(
                name: "IX_UserHobbies_HobbyId",
                table: "UserHobbies",
                column: "HobbyId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserHobbies_Hobbies_HobbyId",
                table: "UserHobbies",
                column: "HobbyId",
                principalTable: "Hobbies",
                principalColumn: "HobbyId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
